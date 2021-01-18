<?php

namespace App\Repositories;

use App\Letter;
use Exception;

use Illuminate\Http\JsonResponse;
use SimpleXMLElement;

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
     * @param  array  $filter
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function all(array $filter = []): JsonResponse
    {
        return $this->db->get('letters.xq', $filter);
    }

    /**
     * Get a single letter.
     *
     * @param $id
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function one($id): JsonResponse
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
        $response = [];
        $types = [
            'norm',
            'dipl',
        ];

        foreach ($types as $type) {
            $response[$type] = optional(Letter::where('number', $number)->first())->{$type};
        }

        return $response;
    }

    /**
     * Get a single letter in xml format.
     *
     * @param $id
     *
     * @return SimpleXMLElement
     * @throws Exception
     */
    public function raw($id): SimpleXMLElement
    {
        return $this->db->raw('raw.xq', [
            'id' => $id,
        ]);
    }
}
