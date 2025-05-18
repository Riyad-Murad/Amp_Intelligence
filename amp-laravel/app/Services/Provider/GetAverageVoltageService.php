<?php

namespace App\Services\Provider;

use DateTime;
use App\Models\Master;
use App\Models\Metric;

class GetAverageVoltageService
{
    public static function getAverageVoltage(int $providerId): array
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');

        $averageVoltageByDay = Metric::whereIn('master_id', $masterIds)
            ->selectRaw('SUBSTRING(date_month, 1, 5) as day_month, AVG(voltage) as average_voltage')
            ->groupBy('day_month')
            ->orderBy('day_month')
            ->get()
            ->mapWithKeys(function ($item) {
                try {
                    $date = DateTime::createFromFormat('m-d', $item->day_month);
                    if ($date) {
                        return [$date->format('Y-m-d') => round($item->average_voltage, 2)];
                    }
                } catch (\Exception $e) {
                    return [];
                }
                return [];
            })
            ->filter()
            ->toArray();

        return $averageVoltageByDay;
    }
}
