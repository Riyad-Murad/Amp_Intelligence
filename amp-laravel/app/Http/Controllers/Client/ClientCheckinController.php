<?php

namespace App\Http\Controllers\Client;

use Throwable;
use App\Http\Controllers\Controller;
use App\Services\Client\ClientCheckinService;
use App\Http\Requests\Client\ClientRequestCheckin;

class ClientCheckinController extends Controller
{
    public function slaveCheckin(ClientRequestCheckin $request)
    {
        try {
            $slave = ClientCheckinService::checkin($request->all());
            return $this->messageResponse(true, "Slave checked in successfully", 200, $slave);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Slave checkin failed", $e->getMessage(), 500);
        }
    }
}
