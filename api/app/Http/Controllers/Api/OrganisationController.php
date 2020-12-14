<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

use App\Repositories\OrganisationRepository;

class OrganisationController
{
    /**
     * Display a list of all persons.
     *
     * @param OrganisationRepository $repository
     * @return Response
     */
    public function index(OrganisationRepository $repository)
    {
        return Cache::tags('api')->remember('organisation-index', now()->addHour(), function () use ($repository) {
            return $repository->all();
        });
    }
}
