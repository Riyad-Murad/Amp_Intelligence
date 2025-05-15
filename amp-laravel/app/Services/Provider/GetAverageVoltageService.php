<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;
use App\Models\User;

class GetAverageVoltageService
{
    public static function getAverageVoltage(int $providerId): float
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return round(Metric::whereIn('master_id', $masterIds)->avg('voltage'), 2);
    }
}
