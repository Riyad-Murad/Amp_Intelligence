<?php

namespace App\Http\Controllers\Provider;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Provider\GeneratingReportService;

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

    public function editProfile(Request $request){
        
    }

    public function editUser(Request $request){

    }

    public function getUsers(Request $request){
    
    }

    public function getMetrics(Request $request){
    
    }

    public function getLines(Request $request){
    
    }
}
