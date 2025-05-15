<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Services\Provider\GetAllLinesService;
use App\Http\Requests\Provider\EditUserRequest;
use App\Services\Provider\EditClientUserService;
use App\Services\Provider\GetOverviewDataService;
use App\Services\Provider\GetMetricSummaryService;
use App\Services\Provider\GeneratingReportService;
use App\Http\Requests\Provider\EditProfileRequest;
use App\Services\Provider\GetAllClientUsersService;
use App\Services\Provider\GetAverageVoltageService;
use App\Services\Provider\GetTotalPowerUsageService;
use App\Services\Provider\ProviderEditProfileService;
use App\Services\Provider\GetAllClientMetricsService;
use App\Services\Provider\GetPowerUsageByClientService;
use App\Services\Provider\GetVoltageDistributionService;

class ProviderFunctionsController extends Controller
{
    public function generateReport()
    {
        try {
            $report = GeneratingReportService::generateReport();
            return $this->messageResponse(true, "Report Generated", 200, $report);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, "Failed to generate report ", $e->getMessage(), 500);
        }
    }

    public function editProfile(EditProfileRequest $request)
    {
        try {
            ProviderEditProfileService::editProfile($request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function editUser(EditUserRequest $request, $id)
    {
        try {
            EditClientUserService::editUser($id, $request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function getUsers($id)
    {
        try {
            $users = GetAllClientUsersService::getAll($id);

            return $this->messageResponse(true, "Messages retrieved successfully", 200, $users);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve messages", 500);
        }
    }

    public function getMetrics($id)
    {
        try {
            $metrics = GetAllClientMetricsService::getAll($id);

            return $this->messageResponse(true, "Messages retrieved successfully", 200, $metrics);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve messages", 500);
        }
    }

    public function getLines($id)
    {
        try {
            $lines = GetAllLinesService::getAll($id);

            return $this->messageResponse(true, "Messages retrieved successfully", 200, $lines);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve messages", 500);
        }
    }

    public function getOverviewData($id)
    {
        try {
            $overviewData = GetOverviewDataService::getOverviewData($id);
            return $this->messageResponse(true, "Overview data retrieved successfully", 200, $overviewData);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve overview data", 500);
        }
    }

    public function getTotalPowerUsage($id)
    {
        try {
            $totalPower = GetTotalPowerUsageService::getTotalPowerUsage($id);
            return $this->messageResponse(true, "Total power usage retrieved successfully", 200, $totalPower);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve total power usage", 500);
        }
    }

    public function getAverageVoltage($id)
    {
        try {
            $averageVoltage = GetAverageVoltageService::getAverageVoltage($id);
            return $this->messageResponse(true, "Average voltage retrieved successfully", 200, $averageVoltage);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve average voltage", 500);
        }
    }

    public function getPowerUsageByClient($id)
    {
        try {
            $powerUsageByClient = GetPowerUsageByClientService::getPowerUsageByClient($id);
            return $this->messageResponse(true, "Power usage by client retrieved successfully", 200, $powerUsageByClient);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve power usage by client", 500);
        }
    }

    public function getVoltageDistribution($id)
    {
        try {
            $voltageDistribution = GetVoltageDistributionService::getVoltageDistribution($id);
            return $this->messageResponse(true, "Voltage distribution retrieved successfully", 200, $voltageDistribution);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve voltage distribution", 500);
        }
    }

    public function getMetricsSummary($id)
    {
        try {
            $metricsSummary = GetMetricSummaryService::getMetricSummary($id);
            return $this->messageResponse(true, "Metrics summary retrieved successfully", 200, $metricsSummary);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve metrics summary", 500);
        }
    }
}
