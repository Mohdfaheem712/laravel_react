<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\JobsController;

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

Route::post('jobs/applied-list', [JobsController::class, 'index']);
Route::post('jobs/sendOtp', [JobsController::class, 'create']);
Route::post('jobs/apply', [JobsController::class, 'store']);
//Route::post('jobs/verifyOtp', [JobsController::class, 'verifyOtp']);

