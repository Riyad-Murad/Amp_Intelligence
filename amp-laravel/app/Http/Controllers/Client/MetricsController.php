<?php

namespace App\Http\Controllers\Client;

use Throwable;
use App\Http\Controllers\Controller;
use App\Services\Client\MetricsEntryService;
use App\Http\Requests\Client\ClientRequestMetric;

class MetricsController extends Controller
{
    public function slaveMetrics(ClientRequestMetric $request)
    {
        try {
            $metric = MetricsEntryService::addMetrics($request->all());
            return $this->messageResponse(true, "Slave metric stored", 200, $metric);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Metric save failed", $e->getMessage(), 500);
        }
    }
}
