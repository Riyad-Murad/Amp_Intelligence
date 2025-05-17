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
            ->whereRaw('SUBSTRING(date_month, 1, 2) = ?', [now()->format('m')])
            ->sum('power'), 2);
    }
}
