<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Services\Provider\GeneratingReportService;
use App\Http\Requests\Provider\EditUserRequest;
use App\Http\Requests\Provider\EditProfileRequest;

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

    public function editProfile(EditProfileRequest $request){
        
    }

    public function editUser(EditUserRequest $request){

    }

    public function getUsers(){
    
    }

    public function getMetrics(){
    
    }

    public function getLines(){
    
    }
}
