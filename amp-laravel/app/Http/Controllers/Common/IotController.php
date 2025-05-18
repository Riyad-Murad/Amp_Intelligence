<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;

use Throwable;
use InvalidArgumentException;
use App\Services\IotService;
use App\Http\Requests\Client\ClientRequestMetric;
use App\Http\Requests\Client\ClientRequestCheckin;
use App\Http\Requests\Provider\ProviderRequestLine;
use App\Http\Requests\Provider\ProviderRequestCheckin;

class IotController extends Controller
{
    // Master Check In
    public function masterCheckin(ProviderRequestCheckin $request)
    {
        try {
            $data = IotService::masterCheckin($request->validated());
            return $this->messageResponse(true, "Master checked in successfully", 200, $data);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Master checkin failed", $e->getMessage(), 500);
        }
    }

    // Slave Check In
    public function slaveCheckin(ClientRequestCheckin $request)
    {
        try {
            $slave = IotService::slaveCheckin($request->validated());

            return $this->messageResponse(true, "Slave Checkin Successful", 200, $slave);
        } catch (InvalidArgumentException $e) {
            return $this->errorMessageResponse(false, 'Invalid Input', $e->getMessage(), 422);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Slave checkin failed", $e->getMessage(), 500);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, 'Unexpected error', $e->getMessage(), 500);
        }
    }

    // Slave Metrics
    public function slaveMetrics(ClientRequestMetric $request)
    {
        try {
            $metric = IotService::addMetrics($request->validated());
            return $this->messageResponse(true, "Slave metric stored", 200, $metric);
        } catch (InvalidArgumentException $e) {
            return $this->errorMessageResponse(false, 'Invalid Input', $e->getMessage(), 422);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Metric save failed", $e->getMessage(), 500);
        }
    }

    // Master Lines
    public function masterLines(ProviderRequestLine $request)
    {
        try {
            $line = IotService::addLines($request->validated());
            return $this->messageResponse(true, "Master lines data saved", 200, $line);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Failed to save master lines", $e->getMessage(), 500);
        }
    }
}
