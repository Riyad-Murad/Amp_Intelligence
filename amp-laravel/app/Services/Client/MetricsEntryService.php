<?php

namespace App\Services\Client;

use Carbon\Carbon;
use App\Models\Slave;
use App\Models\Master;
use App\Models\Metric;
use InvalidArgumentException;

class MetricsEntryService
{
    public static function addMetrics(array $data): array
    {
        if (empty($data['master_id']) || empty($data['slave_id'])) {
            throw new InvalidArgumentException('master_id and slave_id are required.');
        }

        $master = Master::where('id', $data['master_id'])->firstOrFail();
        $slave = Slave::where('id', $data['slave_id'])->firstOrFail();

        try {
            $date = Carbon::createFromFormat('m-d', $data['date_month']);
            $data['date_month'] = $date->format('m-d');
        } catch (\Exception $e) {
            throw new InvalidArgumentException('Invalid date_month format. Use mm-dd or yyyy-mm.');
        }

        $metric = Metric::create([
            'voltage'   => $data['voltage'],
            'current'   => $data['current'],
            'power'     => $data['power'],
            'energy'    => $data['energy'],
            'slave_id'  => $slave->id,
            'master_id' => $master->id,
            'date_month' => $data['date_month'],
        ]);

        return $metric->toArray();
    }
}
