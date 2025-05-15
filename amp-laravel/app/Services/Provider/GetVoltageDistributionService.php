<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;

class GetVoltageDistributionService
{
    public static function getVoltageDistribution(int $providerId): array
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return Metric::whereIn('master_id', $masterIds)
            ->select(['id', 'voltage'])
            ->get()
            ->toArray();
    }
}
