<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::get('/users', 'list');
    Route::get('/users-count', 'usersCount');
    Route::get('/user/{id}', 'dataUser');
    Route::put('/user/{id}', 'update');
    Route::put('/user-psw/{id}', 'changePassword');
    Route::delete('/user/{id}', 'destroy');
});

Route::controller(TableController::class)->group(function () {
    Route::get('/tables', 'index');
    Route::post('/table', 'store');
    Route::put('/change/{id}', 'changeAvailability');
});

Route::controller(DishController::class)->group(function () {
    Route::get('/dishes', 'index');
    Route::get('/dishes-count', 'dishesQuantity');
    Route::get('/dish/{id}', 'dishById');
    Route::put('/dish/{id}', 'update');
    Route::post('/dish', 'store');
    Route::delete('/dish/{id}', 'destroy');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::get('/categories-count', 'categoriesQuantity');
    Route::get('/category/{id}', 'categoryById');
    Route::post('/category', 'store');
    Route::delete('/category/{id}', 'destroy');
    Route::get('/categorybyname/{name}', 'getIdbyName');
    Route::put('/category/{id}', 'update');
});

Route::controller(SaleController::class)->group(function () {
    Route::post('/sale', 'store');
    Route::get('/sales-today', 'todaySales');
    Route::get('/sales-week', 'getSalesLastFiveDays');
    Route::get('/sales-four-weeks', 'getSalesLastFourWeeks');
});

Route::controller(RoleController::class)->group(function () {
    Route::get('/roles', 'index');
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


