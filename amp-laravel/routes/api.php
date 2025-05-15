<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\Common\LinesController;
use App\Http\Controllers\Common\MetricsController;
use App\Http\Controllers\Common\ClientCheckinController;
use App\Http\Controllers\Common\ProviderCheckinController;
use App\Http\Controllers\Admin\AdminFunctionsController;
use App\Http\Controllers\Clients\ClientFunctionsController;
use App\Http\Controllers\Provider\ProviderFunctionsController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {
        // Logout for all users
        Route::post("/logout", [AuthController::class, "logout"]);

        // Slave/Client Users
        Route::group(["prefix" => "clients", "middleware" => "isClient"], function () {
            Route::get("/clientReport/{id}", [ClientFunctionsController::class, "generateReport"]);
            Route::get("/clientDashboardData/{id}", [ClientFunctionsController::class, "getDashboardData"]);
            Route::post("/editProfile", [ClientFunctionsController::class, "editProfile"]);
        });

        // Master/Provider Users
        Route::group(["prefix" => "providers", "middleware" => "isProvider"], function () {
            Route::get("/providerReport", [ProviderFunctionsController::class, "generateReport"]);

            Route::get("/getAllUsers/{id}", [ProviderFunctionsController::class, "getUsers"]);
            Route::get("/getAllMetrics/{id}", [ProviderFunctionsController::class, "getMetrics"]);
            Route::get("/getAllLines/{id}", [ProviderFunctionsController::class, "getLines"]);

            Route::get("/overview/{id}", [ProviderFunctionsController::class, "getOverviewData"]); // check for "totalPowerPerMonth"
            Route::get("/totalPowerUsage/{id}", [ProviderFunctionsController::class, "getTotalPowerUsage"]); // check output
            Route::get("/averageVoltage/{id}", [ProviderFunctionsController::class, "getAverageVoltage"]);
            Route::get("/powerUsageByClient/{id}", [ProviderFunctionsController::class, "getPowerUsageByClient"]);
            
            Route::post("/editProfile", [ProviderFunctionsController::class, "editProfile"]);
            Route::post("/editUser/{id}", [ProviderFunctionsController::class, "editUser"]);
        });

        // Admin Users
        Route::group(["prefix" => "admins", "middleware" => "isAdmin"], function () {
            Route::get("/getAllProviders", [AdminFunctionsController::class, "getProviders"]);
            Route::get("/getAllContactMessages", [AdminFunctionsController::class, "getContactMessages"]);

            Route::post("/editProvider/{id}", [AdminFunctionsController::class, "editProvider"]);
            Route::post("/editProfile", [AdminFunctionsController::class, "editProfile"]);
            Route::delete("/deleteContactMessage/{id}", [AdminFunctionsController::class, "deleteMessage"]);
        });
    });

    // Public Routes for Data Entry
    Route::post("/slaveCheckIn", [ClientCheckinController::class, "slaveCheckin"]);
    Route::post("/metrics", [MetricsController::class, "slaveMetrics"]);

    Route::post("/masterCheckIn", [ProviderCheckinController::class, "masterCheckin"]);
    Route::post("/lines", [LinesController::class, "masterLines"]);

    //Unauthenticated Users
    Route::post("/login", [AuthController::class, "login"])->name("login");
});
