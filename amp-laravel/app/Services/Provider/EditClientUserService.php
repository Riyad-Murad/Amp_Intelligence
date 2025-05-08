<?php

namespace App\Services\Provider;

use App\Models\User;

class EditClientUserService
{
    public static function editUser(int $id, array $data)
    {
        $user = User::where('id', $id)->where('user_type', 'Client')->firstOrFail();

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        $user->save();

        return $user;
    }
}
