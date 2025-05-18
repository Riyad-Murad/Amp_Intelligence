<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Client\ClientService;
use App\Http\Requests\Client\EditProfileRequest;

class ClientController extends Controller
{
    public function generateReport($id)
    {
        try {

            if (!$id) {
                return $this->messageResponse(false, "Route ID not provided", 400, null);
            }

            $report = ClientService::generateReport($id);
            return $this->messageResponse(true, "Report Generated", 200, $report);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, "Failed to generate report ", $e->getMessage(), 500);
        }
    }

    public function editProfile(EditProfileRequest $request)
    {
        try {
            ClientService::editProfile($request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function getDashboardData($id)
    {
        try {
            $dashboardData = ClientService::getDashboardData($id);
            return $this->messageResponse(true, "Dashboard data fetched successfully", 200, $dashboardData);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, "Failed to fetch dashboard data", $e->getMessage(), 500);
        }
    }
}
