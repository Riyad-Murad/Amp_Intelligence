<?php

namespace App\Services\Provider;

use App\Models\Master;

class ProviderCheckinService
{
    public static function checkin(array $data)
    {
        $master = Master::firstOrCreate(
            ['name' => $data['masterId']],
            ['user_id' => $data['userId']]
        );

        return $master->toArray();
    }
}
