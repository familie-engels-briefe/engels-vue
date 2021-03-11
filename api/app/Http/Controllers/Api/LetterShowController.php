<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

use App\Repositories\LetterRepository;

class LetterShowController
{
    /**
     * Display a single letter.
     *
     * @param  LetterRepository  $repository
     * @param  string  $id
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(LetterRepository $repository, $id): JsonResponse
    {
        /**
         * @var $response JsonResponse
         */
        return Cache::tags('api')->remember('letter-index-' . $id, 3600, function () use ($repository, $id) {
            $letter = $repository->one($id)->getData();

            if ($letter->success === false) {
                abort($letter->code, $letter->error);
            }

            $data = [];
            $data['details'] = [
                'number' => $letter->data->number,
                'version' => $letter->data->version,
                'date' => $letter->data->date,
                'doctype' => $letter->data->doctype,
                'title' => $letter->data->title,
                'sent' => $letter->data->sent,
                'received' => $letter->data->received,
                'mentioned' => $letter->data->mentioned,
                'refs' => $letter->data->refs,
                'source' => $letter->data->sourceDescription,
            ];
            $data['facsimiles'] = $letter->data->facs->graphic;
            $data['xml'] = $letter->data->xml->content;
            $data['html'] = $repository->html($letter->data->number);
            $data['time'] = now();

            return new JsonResponse($data);
        });
    }
}
