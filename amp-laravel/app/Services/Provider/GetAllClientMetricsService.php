<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;

class GetAllClientMetricsService
{
    public static function getAll(int $providerId)
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return Metric::whereIn('master_id', $masterIds)->get();
    }
}
