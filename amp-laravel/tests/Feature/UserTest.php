<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
// use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use WithFaker;

    public function testLoginUser(): void
    {
        $user = User::factory()->create();
        $credentials = [
            'email' => $user->email,
            'password' => 'password'
        ];

        $response = $this->postJson('http://localhost:8000/api/v1/login', $credentials);

        $response->assertStatus(200)
            ->assertJsonStructure([
                "success",
                "message",
                "data" => [
                    "id",
                    "slave_id",
                    "user_type",
                    "token"
                ]
            ])
            ->assertJson([
                "success" => true,
                "message" => "Logged In Successfully"
            ]);
    }

    public function testInvalidLogin(): void
    {
        $credentials = [
            'email' => 'nonexistentuser@example.com',
            'password' => 'wrongpassword'
        ];

        $response = $this->postJson('http://localhost:8000/api/v1/login', $credentials);

        $response->assertStatus(400)
            ->assertJson([
                "success" => false,
                "message" => "Invalid credentials"
            ]);
    }

    public function testLogoutUserSuccessfully(): void
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('http://localhost:8000/api/v1/logout');

        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "message" => "Logged Out Successfully",
                "data" => null
            ]);
    }
}
