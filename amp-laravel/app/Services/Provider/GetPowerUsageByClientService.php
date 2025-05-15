<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;
use App\Models\User;

class GetPowerUsageByClientService
{
    public static function getPowerUsageByClient(int $providerId): array
    {
        $masters = Master::where('user_id', $providerId)->with(['metrics' => function ($query) {
            $query->whereYear('date_month', now()->year)
                ->whereMonth('date_month', now()->month);
        }])->get();

        $clientPowerUsage = [];

        $clientSlaveIds = $masters->flatMap(function ($master) {
            return $master->metrics->pluck('slave_id')->unique();
        })->toArray();

        $clients = User::whereIn('slave_id', $clientSlaveIds)->where('user_type', 'Client')->get(['id', 'name', 'slave_id']);

        foreach ($clients as $client) {
            $totalPower = $masters->flatMap(function ($master) use ($client) {
                return $master->metrics->where('slave_id', $client->slave_id)->sum('power');
            })->sum();

            $clientPowerUsage[] = [
                'client_name' => $client->name,
                'total_power' => round($totalPower, 2),
            ];
        }

        // Sort clients by total power usage in descending order
        usort($clientPowerUsage, function ($a, $b) {
            return $b['total_power'] <=> $a['total_power'];
        });

        return $clientPowerUsage;
    }
}
