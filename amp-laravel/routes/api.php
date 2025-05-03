<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {
        // Client Users
        Route::group(["prefix" => "clients", "middleware" => "isClient"], function () {

        });

        // Slave Users
        Route::group(["prefix" => "slaves", "middleware" => "isSlave"], function () {

        });

        // Master Users
        Route::group(["prefix" => "masters", "middleware" => "isMaster"], function () {

        });
    });

    //Unauthenticated Users
    Route::post("/login", [AuthController::class, "login"])->name("login");
});