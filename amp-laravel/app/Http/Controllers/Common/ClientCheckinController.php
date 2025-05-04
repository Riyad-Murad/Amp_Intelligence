<?php

namespace App\Http\Controllers\Common;

use Throwable;
use InvalidArgumentException;
use App\Http\Controllers\Controller;
use App\Services\Client\ClientCheckinService;
use App\Http\Requests\Client\ClientRequestCheckin;

class ClientCheckinController extends Controller
{
    public function slaveCheckin(ClientRequestCheckin $request)
    {
        try {
            $slave = ClientCheckinService::checkin($request->validated());

            return $this->messageResponse(true, "Slave Checkin Successful", 200, $slave);
        } catch (InvalidArgumentException $e) {
            return $this->errorMessageResponse(false, 'Invalid Input', $e->getMessage(), 422);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Slave checkin failed", $e->getMessage(), 500);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, 'Unexpected error', $e->getMessage(), 500);
        }
    }
}
