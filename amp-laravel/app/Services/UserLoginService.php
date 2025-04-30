<?php

namespace App\Services;

use Throwable;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserLoginService
{
    public static function login($request)
    {
        try {
            $credentials = $request->only('email', 'password');

            $token = JWTAuth::attempt($credentials);
            if (!$token) {
                return;
            }

            $authUser = Auth::user();
            $user = User::find($authUser->id);
            $user->save();
            $user->token = $token;

            return $user;
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }

    public static function logout()
    {
        return Auth::logout();
    }

    public static function refresh()
    {
        $token = Auth::refresh();
        $user = Auth::user();
        $user->token = $token;
        $user->type = "bearer";
        return $user;
    }
}
