<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserLoginService;
use App\Http\Requests\AuthRequestLogin;

class AuthController extends Controller
{
    public function login(AuthRequestLogin $request)
    {
        $response = UserLoginService::login($request);
        if (!$response) {
            return $this->errorMessageResponse(false, [], 'Invalid credentials', 400);
        }

        $userData = [
            'id' => $response->id,
            'slave_id' => $response->slave_id,
            'user_type' => $response->user_type,
            'token' => $response->token,
        ];

        return $this->loginMessageResponse(true, "Logged In Successfully", $userData, 200);
    }

    public function logout()
    {
        $response = UserLoginService::logout();
        return $this->loginMessageResponse(true, "Logged Out Successfully", $response, 200);
    }

    public function refresh()
    {
        $response = UserLoginService::refresh();
        return $this->loginMessageResponse(true, "Refreshed Successfully", $response, 200);
    }
}
