<?php

namespace App\Http\Controllers\Api;

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
     * @return Response
     */
    public function index(Request $request, LetterRepository $repository)
    {
        return Cache::tags('api')->remember('letter-index', now()->addHour(), function () use ($repository, $request) {
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
     * @param LetterRepository $repository
     * @param string $id
     * @return JsonResponse
     */
    public function show(LetterRepository $repository, $id)
    {
        /**
         * @var $response JsonResponse
         */
        return Cache::tags('api')->remember('letter-index-' . $id, now()->addHour(), function () use ($repository, $id) {
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
