<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MasterTest extends TestCase
{
    use WithFaker;

    public function testMasterCheckInSuccessfully(): void
    {
        $payload = [
            'user_id' => 1,
            'name' => 'MASTR9'
        ];

        $response = $this->postJson('http://localhost:8000/api/v1/masterCheckIn', $payload);

        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "message" => "Master checked in successfully"
            ])
            ->assertJsonStructure([
                "success",
                "message",
                "data" => [
                    "name",
                    "updated_at",
                    "created_at",
                    "id",
                    "user_id"
                ]
            ]);
    }

    public function testMasterCheckInValidationError(): void
    {
        $response = $this->postJson('http://localhost:8000/api/v1/masterCheckIn', []);

        $response->assertStatus(422)
            ->assertJson([
                "success" => false
            ]);
    }
}
