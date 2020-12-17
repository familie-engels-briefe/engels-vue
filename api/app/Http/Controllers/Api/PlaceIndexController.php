<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

use App\Repositories\PlaceRepository;

class PlaceIndexController
{
    /**
     * Display a list of all persons.
     *
     * @param  PlaceRepository  $repository
     *
     * @return Response
     */
    public function __invoke(PlaceRepository $repository)
    {
        return Cache::tags('api')->remember('place-index', 3600, function () use ($repository) {
            return $repository->all();
        });
    }
}
