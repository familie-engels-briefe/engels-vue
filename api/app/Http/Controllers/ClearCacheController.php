<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class ClearCacheController extends Controller
{
    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke()
    {
        Artisan::call('cache:clear');

        return redirect()->route('sync.index');
    }
}
