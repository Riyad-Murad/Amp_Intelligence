<?php

namespace App\Services\Admin;

use App\Models\User;

class AdminEditProviderProfileService
{
    public static function editProfile(int $id, array $data)
    {
        $user = User::where('id', $id)->where('user_type', 'Provider')->firstOrFail();        

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        $user->save();

        return $user;
    }
}
