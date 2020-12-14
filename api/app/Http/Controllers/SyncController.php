<?php

namespace App\Http\Controllers;

use Exception;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

use App\Repositories\LetterRepository;
use App\Jobs\SyncExist;

class SyncController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(LetterRepository $repository)
    {
        $error = null;
        try {
            $response = json_decode($repository->all()->getContent());
            if (isset($response->error)) {
                throw new Exception(trim($response->error));
            }
            $numberOfDocuments = count($response->data->letter);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            $error = $e->getMessage();
            $numberOfDocuments = 0;
        }

        // Get all cache keys and calculate size
        $redis = Redis::connection('cache')->client();
        $cacheKeys = collect($redis->keys('*'));
        $redis->setOption(\Redis::OPT_REPLY_LITERAL, true);

        $cacheSize = $cacheKeys
            ->map(function ($key) use ($redis) {
                return $redis->rawCommand('DEBUG', 'object', $key);
            })
            ->map(function ($response) {
                $matches = null;
                preg_match('/.*serializedlength:(\d+)/', $response, $matches);

                if (!isset($matches[1])) {
                    return 0;
                }

                return intval($matches[1]);
            })
            ->sum();

        $numberOfHtmlFiles = $cacheKeys->filter(function ($key) {
            return str_contains($key, 'html');
        })
            ->count();

        $units = array( 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
        $power = $cacheSize > 0 ? floor(log($cacheSize, 1024)) : 0;
        $cacheSize = number_format( $cacheSize / (1024 ** $power), 2, '.', ',') . ' ' . $units[ $power];

        return view('sync.index', [
            'lastSync' => read_setting('last_sync'),
            'numberOfDocuments' => $numberOfDocuments,
            'numberOfHtmlFiles' => $numberOfHtmlFiles,
            'cacheSize' => $cacheSize,
            'error' => $error,
        ]);
    }

    /**
     * Show the edit page for a letter.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sync()
    {
        SyncExist::dispatch();

        return redirect()->route('sync.index');
    }
}
