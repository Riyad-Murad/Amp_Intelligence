<?php

namespace App\Services\Provider;

use App\Models\User;
use App\Models\Metric;
use App\Models\Master;

class GetOverviewDataService
{
    public static function getOverviewData(int $providerId): array
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        $clientSlaveIds = Metric::whereIn('master_id', $masterIds)->distinct()->pluck('slave_id');
        $totalClients = User::whereIn('slave_id', $clientSlaveIds)->where('user_type', 'Client')->count();
        $totalPowerThisMonth = Metric::whereIn('master_id', $masterIds)
            ->whereRaw('SUBSTRING(date_month, 1, 2) = ?', [now()->format('m')])
            ->sum('power');

        $averageVoltage = Metric::whereIn('master_id', $masterIds)->avg('voltage');

        return [
            'totalClients' => $totalClients,
            'totalPowerThisMonth' => round($totalPowerThisMonth, 2),
            'averageVoltageAcrossClients' => round($averageVoltage, 2),
            'latestMetricTimestamp' => Metric::whereIn('master_id', $masterIds)->max('created_at'),
        ];
    }
}
