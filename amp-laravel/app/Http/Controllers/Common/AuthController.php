<?php

namespace App\Http\Controllers\Common;

use Throwable;
use App\Services\UserLoginService;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequestLogin;
use Illuminate\Auth\AuthenticationException;

class AuthController extends Controller
{
    public function login(AuthRequestLogin $request)
    {
        try {
            $response = UserLoginService::login($request);

            $userData = [
                'id' => $response->id,
                'slave_id' => $response->slave_id,
                'user_type' => $response->user_type,
                'token' => $response->token,
            ];

            return $this->loginMessageResponse(true, "Logged In Successfully", $userData, 200);
        } catch (AuthenticationException $e) {
            return $this->errorMessageResponse(false, "Authentication Error", $e->getMessage(), 400);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Something went wrong during login", $e->getMessage(), 500);
        }
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
