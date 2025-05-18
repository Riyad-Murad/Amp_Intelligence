<?php

namespace App\Services\Provider;

use DateTime;
use App\Models\Master;
use App\Models\Metric;
use Illuminate\Support\Collection;

class GetTotalPowerUsageService
{
    public static function getTotalPowerUsage(int $providerId): array
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');

        $totalPowerUsageByDay = Metric::whereIn('master_id', $masterIds)
            ->selectRaw('SUBSTRING(date_month, 1, 5) as day_month, SUM(power) as total_power')
            ->groupBy('day_month')
            ->orderBy('day_month')
            ->get()
            ->mapWithKeys(function ($item) {
                try {
                    $date = DateTime::createFromFormat('m-d', $item->day_month);
                    if ($date) {
                        return [$date->format('Y-m-d') => round($item->total_power, 2)];
                    }
                } catch (\Exception $e) {
                    // Log or handle parsing errors as needed
                    return [];
                }
                return [];
            })
            ->filter()
            ->toArray();

        return $totalPowerUsageByDay;
    }
}
