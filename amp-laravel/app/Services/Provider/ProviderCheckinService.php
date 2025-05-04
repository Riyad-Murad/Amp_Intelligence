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
}
