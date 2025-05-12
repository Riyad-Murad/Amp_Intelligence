<?php

namespace App\Http\Controllers\Clients;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Client\GeneratingReportService;
use App\Services\Client\ClientEditProfileService;
use App\Http\Requests\Client\EditProfileRequest;

class ClientFunctionsController extends Controller
{
    public function generateReport($id)
    {
        try {

            if (!$id) {
                return $this->messageResponse(false, "Route ID not provided", 400, null);
            }

            $report = GeneratingReportService::generateReport($id);
            return $this->messageResponse(true, "Report Generated", 200, $report);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, "Failed to generate report ", $e->getMessage(), 500);
        }
    }

    public function editProfile(EditProfileRequest $request)
    {
        try {
            ClientEditProfileService::editProfile($request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }
}
