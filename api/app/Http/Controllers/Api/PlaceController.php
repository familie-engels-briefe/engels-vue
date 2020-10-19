<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

use App\Repositories\PlaceRepository;

class PlaceController
{
    /**
     * Display a list of all persons.
     *
     * @return Response
     */
    public function index(PlaceRepository $repository)
    {
        return Cache::tags('api')->rememberForever('place-index', function () use ($repository) {
            return $repository->all();
        });
    }
}
