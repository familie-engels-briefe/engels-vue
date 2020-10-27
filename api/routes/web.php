<?php

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

Route::get('/', 'DocumentationController@index')->name('documentation');

Route::get('/debug-sentry', function () {
    throw new Exception('Debug Sentry!');
});

Route::group(['middleware' => 'auth'], function () {
    Route::group(['prefix' => 'sync'], function () {
        Route::get('/', 'SyncController@index')->name('sync.index');
        Route::post('/', 'SyncController@sync')->name('sync.sync');
    });
});

Auth::routes();
