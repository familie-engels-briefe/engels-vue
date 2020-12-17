<?php

namespace App\Http\Controllers;

use App\Jobs\SyncExist;

class SyncDataController extends Controller
{
    /**
     * Show the edit page for a letter.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke()
    {
        SyncExist::dispatch();

        return redirect()->route('sync.index');
    }
}
