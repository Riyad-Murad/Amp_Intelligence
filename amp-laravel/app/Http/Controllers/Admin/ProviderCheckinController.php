<?php

namespace App\Http\Controllers\Admin;

use Throwable;
use App\Http\Controllers\Controller;
use App\Services\Provider\ProviderCheckinService;
use App\Http\Requests\Provider\ProviderRequestCheckin;

class ProviderCheckinController extends Controller
{
    public function masterCheckin(ProviderRequestCheckin $request)
    {
        try {
            $data = ProviderCheckinService::checkin($request->validated());
            return $this->messageResponse(true, "Master checked in successfully", 200, $data);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Master checkin failed", $e->getMessage(), 500);
        }
    }
}
