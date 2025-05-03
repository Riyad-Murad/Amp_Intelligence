<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\Admin\MetricsController;
use App\Http\Controllers\Admin\ClientCheckinController;
use App\Http\Controllers\Admin\LinesController;
use App\Http\Controllers\Admin\ProviderCheckinController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {
        // Logout for all users
        Route::post("/logout", [AuthController::class, "logout"]);

        // Slave/Client Users
        Route::group(["prefix" => "slaves", "middleware" => "isClient"], function () {});

        // Master/Provider Users
        Route::group(["prefix" => "masters", "middleware" => "isProvider"], function () {});

        // Admin Users
        Route::group(["prefix" => "admins", "middleware" => "isAdmin"], function () {
            Route::post("/slaveCheckIn", [ClientCheckinController::class, "slaveCheckin"]);
            Route::post("/metrics", [MetricsController::class, "slaveMetrics"]);

            Route::post("/masterCheckIn", [ProviderCheckinController::class, "masterCheckin"]);
            Route::post("/lines", [LinesController::class, "masterLines"]);
        });
    });

    //Unauthenticated Users
    Route::post("/login", [AuthController::class, "login"])->name("login");
});
