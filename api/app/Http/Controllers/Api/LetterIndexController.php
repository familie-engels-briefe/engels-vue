<?php

namespace App\Http\Controllers\Api;

use Exception;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

use App\Repositories\LetterRepository;

class LetterIndexController
{
    /**
     * Display a list of all letters.
     *
     * @param  Request  $request
     * @param  LetterRepository  $repository
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request, LetterRepository $repository): JsonResponse
    {
        return Cache::tags('api')->remember('letter-index', 3600, function () use ($repository, $request) {
            return $repository->all([
                'person-sender-receiver' => $request->get('person-sender-receiver', ''),
                'person-mentioned' => $request->get('person-mentioned', ''),
                'place-sender-receiver' => $request->get('place-sender-receiver', ''),
                'place-mentioned' => $request->get('place-mentioned', ''),
                'organisation-mentioned' => $request->get('organisation-mentioned', ''),
                'time' => now(),
            ]);
        });
    }
}
