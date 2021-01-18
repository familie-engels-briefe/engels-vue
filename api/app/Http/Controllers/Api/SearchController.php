<?php

namespace App\Http\Controllers\Api;

use App\Letter;
use App\Repositories\LetterRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController
{
    /**
     * Handle the incoming request.
     *
     * @param LetterRepository $repository
     * @param string $term
     *
     * @return JsonResponse
     */
    public function __invoke(LetterRepository $repository, string $term)
    {
        $results = Letter::whereRaw('MATCH(`norm`) AGAINST(?)', [$term])
            ->select([
                'number',
                'title',
                'norm',
            ])
            ->limit(10)
            ->get()
            ->map(function ($letter) use ($term) {
                $letter->norm = preg_replace('/\\n\s+/', ' ', strip_tags($letter->norm));
                $letter->norm = substr($letter->norm, strpos($letter->norm, $term) - 100, 200);
                $letter->norm = str_replace($term, '<strong>' . $term . '</strong>', $letter->norm);

                return $letter;
            });

        return new JsonResponse([
            'results' => $results,
            'term' => $term,
            'time' => now(),
        ]);
    }
}
