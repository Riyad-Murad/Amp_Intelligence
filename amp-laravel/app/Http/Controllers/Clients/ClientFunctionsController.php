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
        $report = GeneratingReportService::generateReport();

        return $this->messageResponse(true, "Report Generated", 200, $report);
    }
}
