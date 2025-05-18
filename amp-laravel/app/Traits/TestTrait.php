<?php

namespace App\Traits;

use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

trait TestTrait
{
    public function actingAsClient()
    {
        $client = User::factory()->create(['user_type' => 'Client']);
        $token = JWTAuth::fromUser($client);
        $request = $this->withHeader('Authorization', "Bearer $token");

        return [$request, $client];
    }


    public function actingAsProvider()
    {
        $provider = User::factory()->create(['user_type' => 'provider']);
        $token = JWTAuth::fromUser($provider);
        return $this->withHeader('Authorization', "Bearer $token");
    }

    public function actingAsAdmin()
    {
        $admin = User::factory()->create(['user_type' => 'admin']);
        $token = JWTAuth::fromUser($admin);
        return $this->withHeader('Authorization', "Bearer $token");
    }
}
