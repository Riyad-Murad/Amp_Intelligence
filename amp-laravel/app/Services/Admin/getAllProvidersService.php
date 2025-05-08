<?php

namespace App\Services\Admin;

use App\Models\User;

class getAllProvidersService
{
    public static function getAll()
    {
        return User::where('user_type', 'Provider')->get();
    }
}
