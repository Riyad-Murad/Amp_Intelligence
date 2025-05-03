<?php

namespace App\Services\Client;

use App\Models\Slave;
use App\Models\Master;
use App\Models\Metric;

class MetricsEntryService
{
    public static function addMetrics(array $data)
    {
        $master = Master::where('name', $data['master_id'])->firstOrFail();
        $slave = Slave::where('modbus_id', $data['modbus_id'])->firstOrFail();

        $metric = Metric::create([
            'voltage' => $data['voltage'],
            'current' => $data['current'],
            'power' => $data['power'],
            'energy' => $data['energy'],
            'slave_id' => $slave->id,
            'master_id' => $master->id,
        ]);

        return $metric->toArray();
    }
}
