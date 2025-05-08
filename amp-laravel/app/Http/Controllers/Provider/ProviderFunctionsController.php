<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Services\Provider\GeneratingReportService;
use App\Http\Requests\Provider\EditUserRequest;
use App\Http\Requests\Provider\EditProfileRequest;
use App\Services\Provider\EditClientUserService;
use App\Services\Provider\GetAllLinesService;
use App\Services\Provider\GetAllClientUsersService;

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

    public function editProfile(EditProfileRequest $request) {}

    public function editUser(EditUserRequest $request, $id)
    {
        try {
            EditClientUserService::editUser($id, $request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function getUsers() {}

    public function getMetrics() {}

    public function getLines() {}
}
