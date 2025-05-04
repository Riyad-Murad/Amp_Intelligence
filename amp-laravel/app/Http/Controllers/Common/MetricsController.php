<?php

namespace App\Http\Controllers\Common;

use Throwable;
use InvalidArgumentException;
use App\Http\Controllers\Controller;
use App\Services\Client\MetricsEntryService;
use App\Http\Requests\Client\ClientRequestMetric;

class MetricsController extends Controller
{
    public function slaveMetrics(ClientRequestMetric $request)
    {
        try {
            $metric = MetricsEntryService::addMetrics($request->validated());
            return $this->messageResponse(true, "Slave metric stored", 200, $metric);
        } catch (InvalidArgumentException $e) {
            return $this->errorMessageResponse(false, 'Invalid Input', $e->getMessage(), 422);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Metric save failed", $e->getMessage(), 500);
        }
    }
}
