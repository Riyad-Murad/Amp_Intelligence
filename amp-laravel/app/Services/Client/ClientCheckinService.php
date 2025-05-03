<?php

namespace App\Services\Client;

use App\Models\Slave;
use App\Models\Master;

class ClientCheckinService
{
    public static function checkin(array $data)
    {
        $master = Master::where('name', $data['masterId'])->firstOrFail();

        $slave = Slave::firstOrCreate(
            ['modbus_id' => $data['modbusId']],
            ['master_id' => $master->id]
        );

        return $slave->toArray();
    }
}
