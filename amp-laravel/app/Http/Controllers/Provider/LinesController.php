<?php

namespace App\Http\Controllers\Provider;

use Throwable;
use App\Http\Controllers\Controller;
use App\Services\Provider\LinesEntryService;
use App\Http\Requests\Provider\ProviderRequestLine;

class LinesController extends Controller
{
    public function masterLines(ProviderRequestLine $request)
    {
        try {
            $line = LinesEntryService::addLines($request->all());
            return $this->messageResponse(true, "Master lines data saved", 200, $line);            
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Failed to save master lines", $e->getMessage(), 500);
        }
    }
}
