<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

use App\Repositories\LetterRepository;

class LetterController
{
    /**
     * Display a list of all letters.
     *
     * @param  Request  $request
     * @param  LetterRepository  $repository
     *
     * @return Response
     * @throws Exception
     */
    public function index(Request $request, LetterRepository $repository): Response
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

    /**
     * Display a single letter.
     *
     * @param  LetterRepository  $repository
     * @param  string  $id
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function show(LetterRepository $repository, $id): JsonResponse
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
            ];
            $data['facsimiles'] = $letter->data->facs->graphic;
            $data['xml'] = $letter->data->xml->content;
            $data['html'] = $repository->html($letter->data->number);
            $data['time'] = now();

            return new JsonResponse($data);
        });
    }
}
