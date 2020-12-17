<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\LetterIndexController;
use App\Http\Controllers\Api\LetterShowController;
use App\Http\Controllers\Api\OrganisationIndexController;
use App\Http\Controllers\Api\PersonIndexController;
use App\Http\Controllers\Api\PlaceIndexController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/v1')->group(function () {
    Route::prefix('/letters')->group(function () {
        Route::get('/', LetterIndexController::class)->name('api.letters.index');
        Route::get('/{letter}', LetterShowController::class)->name('api.letters.show');
    });

    Route::prefix('/persons')->group(function () {
        Route::get('/', PersonIndexController::class)->name('api.persons.index');
    });

    Route::prefix('/places')->group(function () {
        Route::get('/', PlaceIndexController::class)->name('api.places.index');
    });

    Route::prefix('/organisations')->group(function () {
        Route::get('/', OrganisationIndexController::class)->name('api.organisations.index');
    });
});
