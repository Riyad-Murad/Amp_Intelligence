<?php

namespace App\Services\Provider;

use DateTime;
use App\Models\Line;
use App\Models\User;
use App\Models\Master;
use App\Models\Metric;

class DashboardService
{
    // Fetch All Clients for the Provider
    public static function getAllClients(int $providerId)
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        $clientSlaveIds = Metric::whereIn('master_id', $masterIds)->distinct()->pluck('slave_id');
        return User::whereIn('slave_id', $clientSlaveIds)->where('user_type', 'Client')->get();
    }

    // Fetch All Client Metric Values
    public static function getAllMetrics(int $providerId)
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return Metric::whereIn('master_id', $masterIds)->get();
    }

    // Fetch All Line Values
    public static function getAllLines(int $providerId)
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return Line::whereIn('master_id', $masterIds)->get();
    }

    // Fetch Average Voltage Values
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

    // Fetch Metric data summary
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

    // Fetch Data Overview for all metrics
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

    // Fetch Power Usage grouped by clients
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

    // Fetch Total Power Usage
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

    // Fetch Voltage Distribution Values
    public static function getVoltageDistribution(int $providerId): array
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return Metric::whereIn('master_id', $masterIds)
            ->select(['id', 'voltage'])
            ->get()
            ->toArray();
    }
}
