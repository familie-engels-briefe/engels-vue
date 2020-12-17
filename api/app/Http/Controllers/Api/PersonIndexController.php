<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

use App\Repositories\PersonRepository;

class PersonIndexController
{
    /**
     * Display a list of all persons.
     *
     * @param  PersonRepository  $repository
     *
     * @return Response
     */
    public function __invoke(PersonRepository $repository)
    {
        return Cache::tags('api')->remember('person-index', 3600, function () use ($repository) {
            return $repository->all();
        });
    }
}
