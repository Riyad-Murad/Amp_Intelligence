<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserLoginService
{
    public static function login($request)
    {
        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            throw new AuthenticationException('Invalid credentials');
        }

        $authUser = Auth::user();
        $user = User::find($authUser->id);
        $user->save();
        $user->token = $token;

        return $user;
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
