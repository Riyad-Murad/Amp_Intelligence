<?php

namespace App\Services\Provider;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ProviderEditProfileService
{
    public static function editProfile(array $data)
    {
        $user = JWTAuth::user();

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
