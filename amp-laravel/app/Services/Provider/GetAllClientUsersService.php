<?php

namespace App\Services\Provider;

use App\Models\User;

class GetAllClientUsersService
{
    public static function getAll()
    {
        return User::where('user_type', 'Client')->get();
    }
}
