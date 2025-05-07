<?php

namespace App\Http\Controllers\Clients;

use Throwable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Client\GeneratingReportService;

class ClientFunctionsController extends Controller
{
    public function generateReport()
    {
        try {
            $report = GeneratingReportService::generateReport();
            return $this->messageResponse(true, "Report Generated", 200, $report);
        } catch (\Exception $e) {
            return $this->messageResponse(false, "Failed to generate report: " . $e->getMessage(), 500, null);
        }
    }
}
