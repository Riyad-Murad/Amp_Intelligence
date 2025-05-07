<?php

namespace App\Services\Client;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ClientEditProfileService
{
    public static function editProfile(array $data)
    {
        $user = JWTAuth::user();

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        $user->save();

        return $user;
    }
}
