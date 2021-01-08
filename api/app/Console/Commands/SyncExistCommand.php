<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\ExistDb\ExistDb;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;
use SimpleXMLElement;

class SyncExistCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exist:sync
        {--dry-run : Perform a test run without writing actual data}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync all exist data from the exist 4 database with the production exist 5 database.';

    /**
     * @var ExistDb
     */
    protected $exist;

    /**
     * @var ExistDb
     */
    protected $replication;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->exist = new ExistDb('exist', '/exist/rest');
        $this->replication = new ExistDb('exist_replication', '');

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     * @throws Exception
     */
    public function handle()
    {
        Log::info('Starting syncronisation...');

        if ($this->option('dry-run')) {
            Log::info('This is a dry run.');
        }

        // Set last sync time
        $syncLogId = DB::table('sync_logs')->insertGetId([
            'started_at' => now(),
        ]);

        // Get letters from replication server
        $index = $this->replication->raw('api/toc-letters');
        $replicationLetters = [];

        $bar = $this->output->createProgressBar($index->count());

        // Update letters in exist with replication server documents
        foreach ($index->letter as $letter) {
            $filename = (string) $letter['filename'];

            $document = $this->replication->createRequest('data/' . $filename,
                'GET', [], false);

            // Sync facsimile
            try {
                $xml = simplexml_load_string($document['body']);
                $this->syncFacsimile($xml);
            } catch (Exception $e) {
                $error = 'Could not parse xml from letter: ' . $filename;
                $this->error($error);
                $this->comment('');
                Log::error($error);
                Log::error($e->getMessage());
            }

            // Sync html
            $this->syncHtml('dipl', (string) $letter['n']);
            $this->syncHtml('norm', (string) $letter['n']);

            // Update xml
            if (!$this->option('dry-run')) {
                $this->exist->updateDocument($filename, $document['body']);
            }

            $log = sprintf('Updated document %s', $filename);
            Log::info($log);

            $replicationLetters[] = $filename;

            $bar->advance();
        }

        $bar->finish();
        $this->comment('');

        // Delete letters from production system which do not exist in replication
        $prodLetters = $this->exist->get('letters.xq');
        $prodLetters = collect(json_decode($prodLetters->getContent(), true,
                512, JSON_THROW_ON_ERROR)->data->letter ?? [])->map(function (
            $letter
        ) {
            return $letter->name;
        });

        $lettersToDelete = array_diff($prodLetters->toArray(),
            $replicationLetters);

        foreach ($lettersToDelete as $letterToDelete) {
            if (!$this->option('dry-run')) {
                $this->exist->deleteDocument($letterToDelete);
            }

            $log = sprintf('Deleted document %s', $letterToDelete);
            Log::info($log);
        }

        // Sync registers
        $this->syncRegisters();

        DB::table('sync_logs')->where('id', $syncLogId)->update([
            'finished_at' => now(),
        ]);

        Log::info('Everything synced.');

        return true;
    }

    /**
     * @param string $type
     * @param string $number
     */
    private function syncHtml(string $type, string $number): void
    {
        if (!in_array($type, ['dipl', 'norm'])) {
            throw new InvalidArgumentException('Only "dipl" and "norm" html types are allowed!');
        }

        $url =
            'api/' . config('app.exist_api_version') . '/letter/fe.' . $number
            . '/html/' . $type;
        $response = $this->replication->createRequest($url, 'GET', [], false);
        if (!isset($response['body'])) {
            $this->error('Could not read body from ' . $type . ' letter html: '
                         . $url);
            $this->comment('');

            Log::error('Could not read body from response: '
                       . serialize($response));
        } elseif (!$this->option('dry-run')) {
            $key = $number . '-html-' . $type;
            Cache::tags([$type, 'html', $number])->put($key, $response['body']);
        }
    }

    /**
     * @param SimpleXMLElement $xml
     */
    private function syncFacsimile(SimpleXMLElement $xml): void
    {
        if (!isset($xml->facsimile)) {
            Log::error(sprintf('No facsimile for xml: %s', serialize($xml)));

            return;
        }

        if (!$this->option('dry-run')) {
            foreach ($xml->facsimile->graphic as $fac) {
                $url = (string) $fac['url'];
                $pdf = $this->replication->createRequest(sprintf('facs/%s',
                    $url), 'GET', [], false);

                if (!isset($pdf['body'])) {
                    Log::error(sprintf('Facsimile does not exist: %s', $url));
                    continue;
                }

                Storage::disk('facsimile')->put($url, $pdf['body']);

                if (Storage::disk('facsimile')->exists($url)) {
                    Log::info(sprintf('Stored facsimile %s in %s: %d bytes',
                        $url, public_path('facsimile'),
                        Storage::disk('facsimile')->size($url)));
                } else {
                    Log::error(sprintf('Could not store facsimile %s!', $url));
                }
            }
        }
    }

    /**
     *
     */
    private function syncRegisters(): void
    {
        $this->info('Syncing registers');

        $registers = [
            'bibl',
            'org',
            'pers',
            'place',
        ];

        foreach ($registers as $register) {
            $document
                =
                $this->replication->createRequest(sprintf('data/register/reg_global_%s.xml',
                    $register), 'GET', [], false);

            if (!$this->option('dry-run')) {
                $this->exist->updateDocument(sprintf('register/reg_global_%s.xml',
                    $register), $document['body']);
            }

            $log = sprintf('Updated register %s', $register);
            Log::info($log);
        }
    }
}
