<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\Client\MetricsController;
use App\Http\Controllers\Client\ClientCheckinController;
use App\Http\Controllers\Provider\LinesController;
use App\Http\Controllers\Provider\ProviderCheckinController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {
        // Slave/Client Users
        Route::group(["prefix" => "slaves", "middleware" => "isClient"], function () {
            // Route::post("/checkin", [ClientCheckinController::class, "slaveCheckin"]);
            // Route::post("/metrics", [MetricsController::class, "slaveMetrics"]);
        });
        
        // Master/Provider Users
        Route::group(["prefix" => "masters", "middleware" => "isProvider"], function () {
            // Route::post("/checkin", [ProviderCheckinController::class, "masterCheckin"]);
            // Route::post("/lines", [LinesController::class, "masterLines"]);
        });

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
