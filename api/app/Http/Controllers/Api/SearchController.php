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
        $results = Letter::whereRaw('MATCH(`norm_sanitized`) AGAINST(?)', [$term])
            ->select([
                'number',
                'title',
                'norm_sanitized',
            ])
            ->limit(10)
            ->get()
            ->map(function ($letter) use ($term) {
                $pos = strpos($letter->norm_sanitized, $term) - 100;
                if ($pos < 0) {
                    $pos = 0;
                }

                $length = 200;
                if ($pos + $length > strlen($letter->norm_sanitized)) {
                    $length = strlen($letter->norm_sanitized) - $pos;
                }

                $result = substr($letter->norm_sanitized, $pos, $length);
                $result = str_replace($term, '<strong>' . $term . '</strong>', $result);

                return [
                    'number' => $letter->number,
                    'title' => $letter->title,
                    'found' => $result
                ];
            });

        return new JsonResponse([
            'results' => $results,
            'term' => $term,
            'time' => now(),
        ]);
    }
}
