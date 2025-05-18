<?php

namespace App\Services\Admin;

use App\Models\User;

class ProviderService
{
        public static function editProfile(int $id, array $data)
    {
        $user = User::where('id', $id)->where('user_type', 'Provider')->firstOrFail();        

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

    public static function getAll()
    {
        return User::where('user_type', 'Provider')->get();
    }
}
