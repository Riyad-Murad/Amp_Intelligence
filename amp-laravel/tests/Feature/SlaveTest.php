<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class SlaveTest extends TestCase
{
    use WithFaker;

    public function testSlaveCheckInSuccessfully(): void
    {
        $payload = [
            'master_id' => 1,
            'modbus_id' => 4
        ];

        $response = $this->postJson('http://localhost:8000/api/v1/slaveCheckIn', $payload);

        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "message" => "Slave Checkin Successful"
            ])
            ->assertJsonStructure([
                "success",
                "message",
                "data" => [
                    "id",
                    "master_id",
                    "modbus_id",
                    "created_at",
                    "updated_at"
                ]
            ]);
    }
}
