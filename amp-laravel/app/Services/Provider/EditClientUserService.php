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

        if (isset($data['email'])) {
            $user->email = $data['email'];
        }

        if (!empty($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        if (isset($data['phone_number'])) {
            $user->phone_number = $data['phone_number'];
        }

        $user->save();

        return $user;
    }
}
