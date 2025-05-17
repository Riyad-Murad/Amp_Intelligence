<?php

namespace App\Http\Controllers\Common;

use Throwable;
use App\Services\ContactMessageService;
use App\Services\UserLoginService;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequestLogin;
use App\Http\Requests\ContactMessageRequest;
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

    public function insertMessage(ContactMessageRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $response = ContactMessageService::insertMessage($validatedData);

            $messageData = [
                'id' => $response->id,
                'name' => $response->name,
                'email' => $response->email,
                'phone_number' => $response->phone_number,
                'message' => $response->message ?? null,
            ];

            return $this->loginMessageResponse(true, "Message Submitted Successfully", $messageData, 200);
        } catch (Throwable $e) {
            return $this->errorMessageResponse(false, "Something went wrong during Contact Message insertion", $e->getMessage(), 500);
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
