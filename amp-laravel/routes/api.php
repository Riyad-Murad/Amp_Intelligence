<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {

    });

    //Unauthenticated Users
    Route::post("/login", [AuthController::class, "login"])->name("login");
});