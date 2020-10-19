<?php

namespace App\Repositories;

use App\ExistDb\ExistDb;
use Symfony\Component\HttpFoundation\Response;

class PersonRepository
{
    /**
     * @var ExistDb
     */
    protected $db;

    /**
     * OrganisationRepository constructor.
     */
    public function __construct()
    {
        $this->db = new ExistDb;
    }

    /**
     * Get all organisations.
     *
     * @return Response
     */
    public function all(): Response
    {
        return $this->db->get('persons.xq');
    }
}
