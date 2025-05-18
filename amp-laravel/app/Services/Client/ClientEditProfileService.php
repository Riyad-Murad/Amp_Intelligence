<?php

namespace App\Services\Client;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ClientEditProfileService
{
    public static function editProfile(array $data)
    {
        $user = JWTAuth::user();
        
        if (!empty($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        $user->save();

        return $user;
    }
}
