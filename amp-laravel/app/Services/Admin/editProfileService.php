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
        
        $user->save();

        return $user;
    }
}
