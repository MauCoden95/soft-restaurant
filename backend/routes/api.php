<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::get('/users', 'list');
});

Route::controller(TableController::class)->group(function () {
    Route::get('/tables', 'index');
    Route::post('/table', 'store');
    Route::put('/change/{id}', 'changeAvailability');
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
    Route::get('/category/{id}', 'categoryById');
    Route::post('/category', 'store');
    Route::delete('/category/{id}', 'destroy');
    Route::get('/categorybyname/{name}', 'getIdbyName');
    Route::put('/category/{id}', 'update');
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


