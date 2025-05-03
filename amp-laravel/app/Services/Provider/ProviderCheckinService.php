<?php

namespace App\Services\Provider;

use App\Models\Master;
use InvalidArgumentException;

class ProviderCheckinService
{
    public static function checkin(array $data)
    {
        $master = Master::updateOrCreate(
            ['name' => $data['name']],
            ['user_id' => $data['user_id']]
        );

        return $master->toArray();
    }
}
