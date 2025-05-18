<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Slave;
use App\Models\Master;
use App\Models\Metric;
use InvalidArgumentException;

class IotService
{
    // Master Check In Service
    public static function masterCheckin(array $data)
    {
        $master = Master::updateOrCreate(
            ['name' => $data['name']],
        );

        if ($master->wasRecentlyCreated) {
            $user = User::create([
                'user_type' => 'Provider',
            ]);

            $master->user_id = $user->id;
            $master->save();
        }

        return $master->toArray();
    }

    // Slave Check In Service
    public static function slaveCheckin(array $data): array
    {
        if (empty($data['master_id']) || empty($data['modbus_id'])) {
            throw new InvalidArgumentException('master_id and modbus_id are required.');
        }

        $master = Master::where('id', $data['master_id'])->firstOrFail();

        $slave = Slave::updateOrCreate(
            ['modbus_id' => $data['modbus_id']],
            ['master_id' => $master->id]
        );

        if ($slave->wasRecentlyCreated) {
            User::create([
                'slave_id' => $slave->id,
                'user_type' => 'Client',
            ]);
        }

        return $slave->toArray();
    }

    // Add Metrics Service
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

    // Add Lines Service
    public static function addLines(array $data): array
    {
        $master = Master::where('id', $data['master_id'])->firstOrFail();

        $line = $master->lines()->create([
            'voltage_l1' => $data['voltage_l1'],
            'voltage_l2' => $data['voltage_l2'],
            'voltage_l3' => $data['voltage_l3'],
            'power_l1'   => $data['power_l1'],
            'power_l2'   => $data['power_l2'],
            'power_l3'   => $data['power_l3'],
        ]);

        return $line->toArray();
    }
}
