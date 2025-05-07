<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\Common\LinesController;
use App\Http\Controllers\Common\MetricsController;
use App\Http\Controllers\Common\ClientCheckinController;
use App\Http\Controllers\Common\ProviderCheckinController;
use App\Http\Controllers\Clients\ClientFunctionsController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {
        // Logout for all users
        Route::post("/logout", [AuthController::class, "logout"]);

        // Slave/Client Users
        Route::group(["prefix" => "clients", "middleware" => "isClient"], function () {
            Route::get("/clientReport", [ClientFunctionsController::class, "generateReport"]);
        });

        // Master/Provider Users
        Route::group(["prefix" => "providers", "middleware" => "isProvider"], function () {});

        // Admin Users
        Route::group(["prefix" => "admins", "middleware" => "isAdmin"], function () {});
    });

    // Public Routes for Data Entry
    Route::post("/slaveCheckIn", [ClientCheckinController::class, "slaveCheckin"]);
    Route::post("/metrics", [MetricsController::class, "slaveMetrics"]);

    Route::post("/masterCheckIn", [ProviderCheckinController::class, "masterCheckin"]);
    Route::post("/lines", [LinesController::class, "masterLines"]);

    //Unauthenticated Users
    Route::post("/login", [AuthController::class, "login"])->name("login");
});
