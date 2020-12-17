<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClearCacheController;
use App\Http\Controllers\DocumentationController;
use App\Http\Controllers\SyncDataController;
use App\Http\Controllers\SyncIndexController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', DocumentationController::class)->name('documentation');

Route::get('/debug-sentry', function () {
    throw new RuntimeException('Debug Sentry!');
});

Route::group(['middleware' => 'auth'], function () {
    Route::group(['prefix' => 'sync'], function () {
        Route::get('/', SyncIndexController::class)->name('sync.index');
        Route::post('/', SyncDataController::class)->name('sync.sync');
        Route::post('/clear-cache', ClearCacheController::class)->name('sync.clear-cache');
    });
});

Auth::routes();
