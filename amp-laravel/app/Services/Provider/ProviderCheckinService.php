<?php

namespace App\Services\Provider;

use App\Models\Master;

class ProviderCheckinService
{
    public static function checkin(array $data)
    {
        $master = Master::firstOrCreate(
            ['name' => $data['master_id']],
            ['user_id' => $data['user_id']]
        );

        return $master->toArray();
    }
}
