<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::get('/users', 'list');
});

Route::controller(DishController::class)->group(function () {
    Route::get('/dishes', 'index');
    Route::get('/dish/{id}', 'dishById');
    Route::put('/dish/{id}', 'update');
    Route::post('/dish', 'store');
    Route::delete('/dish/{id}', 'destroy');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::get('/categorybyname/{name}', 'getIdbyName');
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


