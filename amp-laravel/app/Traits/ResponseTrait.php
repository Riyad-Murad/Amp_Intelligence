<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Exceptions\HttpResponseException;

trait ResponseTrait
{
    function loginMessageResponse($success, $message, $response, $statusCode)
    {
        return response()->json([
            "success" => $success,
            "message" => $message,
            "data" => $response
        ], $statusCode);
    }

    function messageResponse($success, $message, $statusCode, $data = null)
    {
        return response()->json([
            "success" => $success,
            "message" => $message,
            "data" => $data
        ], $statusCode);
    }

    function errorMessageResponse($success, $error, $message, $statusCode)
    {
        return response()->json([
            "success" => $success,
            "error" => $error,
            "message" => $message
        ], $statusCode);
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors(),
            'message' => 'Invalid Credentials'
        ], 422));
    }

    public function actingAsClient()
    {
        $client = User::factory()->create(['user_type' => 'Client']);
        $token = JWTAuth::fromUser($client);
        $request = $this->withHeader('Authorization', "Bearer $token");

        return [$request, $client];
    }
}
