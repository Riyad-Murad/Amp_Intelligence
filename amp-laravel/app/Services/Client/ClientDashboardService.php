<?php

namespace App\Services\Client;

use DateTime;
use DateTimeZone;
use App\Models\Metric;
use Illuminate\Support\Collection;

class ClientDashboardService
{
    public static function getDashboardData($slaveId): array
    {
        $timezone = new DateTimeZone('Asia/Beirut');
        $startOfMonth = (new DateTime('first day of this month', $timezone))->format('Y-m-d H:i:s');
        $endOfMonth = (new DateTime('last day of this month', $timezone))->format('Y-m-d 23:59:59');
        $currentYear = now()->year;

        // Fetch all relevant data ordered by date_month and then created_at
        $allMetrics = Metric::where('slave_id', $slaveId)
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->orderBy('date_month')
            ->orderBy('created_at')
            ->get();

        // Group by the combined year and date_month using createFromFormat
        $groupedByDateMonth = $allMetrics->groupBy(function ($item) use ($currentYear) {
            $date = DateTime::createFromFormat('m-d', $item->date_month);
            if ($date) {
                $date->setDate($currentYear, $date->format('m'), $date->format('d'));
                return $date->format('Y-m-d');
            }
            return null; // Handle cases where parsing fails
        })->filter(); // Remove any null groupings

        $powerUsagePerDay = $groupedByDateMonth->map(function (Collection $dailyMetrics) {
            return round($dailyMetrics->sum('power'), 2);
        })->toArray();

        $cumulativePowerUsage = $groupedByDateMonth->map(function (Collection $dailyMetrics) {
            $cumulative = 0;
            return $dailyMetrics->map(function ($metric) use (&$cumulative) {
                $cumulative += $metric->power;
                return round($cumulative, 2);
            })->toArray();
        })->toArray();

        // Calculate total power usage this month
        $totalPowerUsageThisMonth = $allMetrics->sum('power');

        // Calculate average voltage reach
        $averageVoltageReach = $allMetrics->avg('voltage');

        // Expected power limit
        $expectedPowerLimit = 100;

        return [
            'powerUsagePerDay' => $powerUsagePerDay,
            'cumulativePowerUsage' => $cumulativePowerUsage,
            'totalPowerUsageThisMonth' => round($totalPowerUsageThisMonth, 2),
            'averageVoltageReach' => round($averageVoltageReach, 2),
            'expectedPowerLimit' => $expectedPowerLimit,
        ];
    }
}
