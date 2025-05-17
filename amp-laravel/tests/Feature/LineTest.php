<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
// use Illuminate\Foundation\Testing\RefreshDatabase;

class LineTest extends TestCase
{
    use WithFaker;

    public function testSubmitMasterLinesSuccessfully(): void
    {
        $payload = [
            'master_id' => 1,
            'voltage_l1' => "220.5",
            'voltage_l2' => "219.8",
            'voltage_l3' => "221.1",
            'power_l1' => "50.2",
            'power_l2' => "49.7",
            'power_l3' => "51.3"
        ];

        $response = $this->postJson('http://localhost:8000/api/v1/lines', $payload);

        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "message" => "Master lines data saved"
            ])
            ->assertJsonStructure([
                "success",
                "message",
                "data" => [
                    "voltage_l1",
                    "voltage_l2",
                    "voltage_l3",
                    "power_l1",
                    "power_l2",
                    "power_l3",
                    "master_id",
                    "updated_at",
                    "created_at",
                    "id"
                ]
            ]);
    }
}
