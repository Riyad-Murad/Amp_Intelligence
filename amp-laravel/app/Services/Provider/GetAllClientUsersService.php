<?php

namespace App\Services\Provider;

use App\Models\User;
use App\Models\Master;
use App\Models\Metric;

class GetAllClientUsersService
{
    public static function getAll(int $providerId)
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        $clientSlaveIds = Metric::whereIn('master_id', $masterIds)->distinct()->pluck('slave_id');
        return User::whereIn('slave_id', $clientSlaveIds)->where('user_type', 'Client')->get();
    }
}
