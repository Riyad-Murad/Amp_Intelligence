<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;

class GetTotalPowerUsageService
{
    public static function getTotalPowerUsage(int $providerId): float
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return round(Metric::whereIn('master_id', $masterIds)
            ->whereYear('date_month', now()->year)
            ->whereMonth('date_month', now()->month)
            ->sum('power'), 2);
    }
}
