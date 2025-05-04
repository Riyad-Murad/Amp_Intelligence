<?php

namespace App\Services\Provider;

use App\Models\User;
use App\Models\Master;

class ProviderCheckinService
{
    public static function checkin(array $data)
    {
        $master = Master::updateOrCreate(
            ['name' => $data['name']],
            ['user_id' => $data['user_id']]
        );

        if ($master->wasRecentlyCreated) {
            User::create([
                'user_type' => 'Provider',
            ]);
        }

        return $master->toArray();
    }
}
