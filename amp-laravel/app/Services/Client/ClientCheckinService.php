<?php

namespace App\Services\Client;

use App\Models\User;
use App\Models\Slave;
use App\Models\Master;
use InvalidArgumentException;

class ClientCheckinService
{
    public static function checkin(array $data): array
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
}
