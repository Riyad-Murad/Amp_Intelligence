<?php

namespace App\Http\Controllers\Clients;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Client\GeneratingReportService;

class ClientFunctionsController extends Controller
{
    // public function generateReport()
    public function generateReport(Request $request)
    {
        try {
            $id = $request->header('id');

            if (!$id) {
                return $this->messageResponse(false, "Header ID not provided", 400, null);
            }

            $report = GeneratingReportService::generateReport($id);
            return $this->messageResponse(true, "Report Generated", 200, $report);
        } catch (\Exception $e) {
            return $this->messageResponse(false, "Failed to generate report: " . $e->getMessage(), 500, null);
        }
    }
}
