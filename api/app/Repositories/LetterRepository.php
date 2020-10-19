<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

use App\ExistDb\ExistDb;

class LetterRepository
{
    /**
     * @var ExistDb
     */
    protected $db;

    /**
     * @var ExistDb
     */
    protected $replication;

    /**
     * LetterRepository constructor.
     */
    public function __construct()
    {
        $this->db = new ExistDb;
        $this->replication = new ExistDb('exist_replication', '');
    }

    /**
     * Get all letters.
     *
     * @param array $filter
     * @return Response
     */
    public function all(array $filter = []): Response
    {
        return $this->db->get('letters.xq', $filter);
    }

    /**
     * Get a single letter.
     *
     * @param $id
     * @return Response
     */
    public function one($id): Response
    {
        return $this->db->get('letter.xq', [
            'id' => $id,
        ]);
    }

    /**
     * Get the html representation of a single letter.
     *
     * @param $number
     * @return array
     */
    public function html($number): array
    {
        return [
            'norm' => Cache::tags(['norm', 'html', $number])->get($number . '-html-norm', function () use ($number) {
                $type = 'norm';

                $url = 'api/letter/fe.' . $number . '/html/' . $type;
                $response = $this->replication->createRequest($url, 'GET', [], false);
                if (!isset($response['body'])) {
                    Log::error('Could not read body from ' . $type . ' letter html: ' . $url);
                } else {
                    return $response['body'];
                }

                return null;
            }),
            'dipl' => Cache::tags(['dipl', 'html', $number])->get($number . '-html-dipl', function () use ($number) {
                $type = 'norm';

                $url = 'api/letter/fe.' . $number . '/html/' . $type;
                $response = $this->replication->createRequest($url, 'GET', [], false);
                if (!isset($response['body'])) {
                    Log::error('Could not read body from ' . $type . ' letter html: ' . $url);
                } else {
                    return $response['body'];
                }

                return null;
            }),
        ];
    }

    /**
     * Get a single letter in xml format.
     *
     * @param $id
     * @return \SimpleXMLElement
     */
    public function raw($id): \SimpleXMLElement
    {
        return $this->db->raw('raw.xq', [
            'id' => $id,
        ]);
    }
}
