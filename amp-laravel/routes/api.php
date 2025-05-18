<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\IotController;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Provider\ProviderController;

Route::group(["prefix" => "v1"], function () {
    //Authenticated Users
    Route::group(["middleware" => "auth:api"], function () {
        // Logout for all users
        Route::post("/logout", [AuthController::class, "logout"]);

        // Slave/Client Users
        Route::group(["prefix" => "clients", "middleware" => "isClient"], function () {
            Route::get("/clientReport/{id}", [ClientController::class, "generateReport"]);
            Route::get("/clientDashboardData/{id}", [ClientController::class, "getDashboardData"]);
            Route::post("/editProfile", [ClientController::class, "editProfile"]);
        });

        // Master/Provider Users
        Route::group(["prefix" => "providers", "middleware" => "isProvider"], function () {
            Route::get("/providerReport", [ProviderController::class, "generateReport"]);

            Route::get("/getAllUsers/{id}", [ProviderController::class, "getUsers"]);
            Route::get("/getAllMetrics/{id}", [ProviderController::class, "getMetrics"]);
            Route::get("/getAllLines/{id}", [ProviderController::class, "getLines"]);

            Route::get("/overview/{id}", [ProviderController::class, "getOverviewData"]);
            Route::get("/totalPowerUsage/{id}", [ProviderController::class, "getTotalPowerUsage"]);
            Route::get("/averageVoltage/{id}", [ProviderController::class, "getAverageVoltage"]);
            Route::get("/powerUsageByClient/{id}", [ProviderController::class, "getPowerUsageByClient"]);
            Route::get("/voltageDistribution/{id}", [ProviderController::class, "getVoltageDistribution"]);
            Route::get("/metricsSummary/{id}", [ProviderController::class, "getMetricsSummary"]);
            
            Route::post("/editProfile", [ProviderController::class, "editProfile"]);
            Route::post("/editUser/{id}", [ProviderController::class, "editUser"]);
        });

        // Admin Users
        Route::group(["prefix" => "admins", "middleware" => "isAdmin"], function () {
            Route::get("/getAllProviders", [AdminController::class, "getProviders"]);
            Route::get("/getAllContactMessages", [AdminController::class, "getContactMessages"]);

            Route::post("/editProvider/{id}", [AdminController::class, "editProvider"]);
            Route::post("/editProfile", [AdminController::class, "editProfile"]);
            Route::delete("/deleteContactMessage/{id}", [AdminController::class, "deleteMessage"]);
        });
    });

    // Public Routes for Data Entry
    Route::post("/slaveCheckIn", [IotController::class, "slaveCheckin"]);
    Route::post("/metrics", [IotController::class, "slaveMetrics"]);

    Route::post("/masterCheckIn", [IotController::class, "masterCheckin"]);
    Route::post("/lines", [IotController::class, "masterLines"]);
    
    // Public Route for Contact Message Submission
    Route::post("/insertMessage", [AuthController::class, "insertMessage"]);
    
    //Unauthenticated Users
    Route::post("/login", [AuthController::class, "login"])->name("login");
});
