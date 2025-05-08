<?php

namespace App\Services\Admin;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class editProfileService
{
    public static function editProfile(array $data){
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

        if (isset($data['phone_number'])) {
            $user->phone_number = $data['phone_number'];
        }

        $user->save();

        return $user;
    }
}
