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

        if (isset($data['email'])) {
            $user->email = $data['email'];
        }
        
        if (!empty($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        $user->save();

        return $user;
    }
}
