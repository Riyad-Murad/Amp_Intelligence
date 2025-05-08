<?php

namespace App\Services\Provider;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ProviderEditProfileService
{
    public static function editProfile(array $data)
    {
        $user = JWTAuth::user();

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        if (isset($data['email'])) {
            $user->email = $data['email'];
        }

        $user->save();

        return $user;
    }
}
