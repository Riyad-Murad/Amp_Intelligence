<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;
use App\Models\User;

class GetMetricSummaryService
{
    public static function getMetricSummary(int $providerId): array
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return [
            'minPower' => round(Metric::whereIn('master_id', $masterIds)->min('power'), 2),
            'maxPower' => round(Metric::whereIn('master_id', $masterIds)->max('power'), 2),
            'avgPower' => round(Metric::whereIn('master_id', $masterIds)->avg('power'), 2),
            'minVoltage' => round(Metric::whereIn('master_id', $masterIds)->min('voltage'), 2),
            'maxVoltage' => round(Metric::whereIn('master_id', $masterIds)->max('voltage'), 2),
            'avgVoltage' => round(Metric::whereIn('master_id', $masterIds)->avg('voltage'), 2),
        ];
    }
}
