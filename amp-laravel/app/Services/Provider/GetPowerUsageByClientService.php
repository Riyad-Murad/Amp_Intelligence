<?php

namespace App\Services\Provider;

use App\Models\Master;
use App\Models\Metric;
use App\Models\User;

class GetPowerUsageByClientService
{
    public static function getPowerUsageByClient(int $providerId): array
    {
        $masters = Master::where('user_id', $providerId)
            ->with(['metrics' => function ($query) {
                $query->whereRaw('SUBSTRING(date_month, 1, 2) = ?', [now()->format('m')]);
            }])
            ->get();

        $clientPowerUsage = [];

        // Collect unique slave_ids from the loaded metrics
        $clientSlaveIds = $masters->flatMap(function ($master) {
            return $master->metrics->pluck('slave_id');
        })->unique()->toArray();

        // Get clients matching those slave_ids
        $clients = User::whereIn('slave_id', $clientSlaveIds)
            ->where('user_type', 'Client')
            ->get(['id', 'name', 'slave_id']);

        foreach ($clients as $client) {
            // Sum power for each client's slave_id across all master's metrics (already filtered by month)
            $totalPower = $masters->sum(function ($master) use ($client) {
                return $master->metrics->where('slave_id', $client->slave_id)->sum('power');
            });

            $clientPowerUsage[] = [
                'client_name' => $client->name,
                'total_power' => round($totalPower, 2),
            ];
        }

        // Sort clients by total power usage in descending order
        usort($clientPowerUsage, fn($a, $b) => $b['total_power'] <=> $a['total_power']);

        return $clientPowerUsage;
    }
}
