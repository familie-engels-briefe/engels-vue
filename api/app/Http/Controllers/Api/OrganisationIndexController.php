<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

use App\Repositories\OrganisationRepository;

class OrganisationIndexController
{
    /**
     * Display a list of all persons.
     *
     * @param OrganisationRepository $repository
     *
     * @return Response
     */
    public function __invoke(OrganisationRepository $repository)
    {
        return Cache::tags('api')->remember('organisation-index', 3600, function () use ($repository) {
            return $repository->all();
        });
    }
}
