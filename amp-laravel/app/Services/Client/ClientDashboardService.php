<?php

namespace App\Services\Client;

use DateTime;
use DateTimeZone;
use App\Models\Metric;

class ClientDashboardService
{
    public static function getDashboardData($slaveId)
    {
        $timezone = new DateTimeZone('Asia/Beirut');
        $startOfMonth = (new DateTime('first day of this month', $timezone))->format('Y-m-d H:i:s');
        $endOfMonth = (new DateTime('last day of this month', $timezone))->format('Y-m-d 23:59:59');

        // Fetch power usage per day for the current month
        $powerUsagePerDayData = Metric::where('slave_id', $slaveId)
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->selectRaw('DATE(created_at) as date, SUM(power) as total_power')
            ->groupByRaw('DATE(created_at)')
            ->orderByRaw('DATE(created_at)')
            ->get();

        $powerUsagePerDay = $powerUsagePerDayData->pluck('total_power', 'date')->toArray();

        // Fetch cumulative power usage per day for the current month
        $cumulativePowerUsageData = Metric::where('slave_id', $slaveId)
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->orderBy('created_at')
            ->selectRaw('DATE(created_at) as date, power')
            ->get();

        $cumulativePower = 0;
        $cumulativePowerUsage = $cumulativePowerUsageData->mapWithKeys(function ($item, $key) use (&$cumulativePower) {
            $cumulativePower += $item['power'];
            return [$item['date'] => round($cumulativePower, 2)];
        })->toArray();

        // Calculate total power usage this month
        $totalPowerUsageThisMonth = Metric::where('slave_id', $slaveId)
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->sum('power');

        
    }
}
