<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Slave;
use App\Models\Master;
use App\Traits\TestTrait;
use Illuminate\Foundation\Testing\WithFaker;

class MetricTest extends TestCase
{
    use WithFaker, TestTrait;

    public function testSubmitSlaveMetricsSuccessfully(): void
    {
        [$request, $client] = $this->actingAsClient();

        $master = Master::factory()->create([
            'user_id' => $client->id,
        ]);

        $slave = Slave::factory()->create([
            'master_id' => $master->id,
        ]);

        $payload = [
            'power' => "10",
            'energy' => "30",
            'voltage' => "220",
            'current' => "20",
            'master_id' => $master->id,
            'date_month' => "05-16",
            'slave_id' => $slave->id
        ];

        $response = $request->postJson('http://localhost:8000/api/v1/metrics', $payload);

        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "message" => "Slave metric stored"
            ])
            ->assertJsonStructure([
                "success",
                "message",
                "data" => [
                    "voltage",
                    "current",
                    "power",
                    "energy",
                    "slave_id",
                    "master_id",
                    "date_month",
                    "updated_at",
                    "created_at",
                    "id"
                ]
            ]);
    }

    public function testSubmitSlaveMetricsValidationError(): void
    {
        $response = $this->postJson('http://localhost:8000/api/v1/metrics', []);

        $response->assertStatus(422)
            ->assertJson([
                "success" => false
            ]);
    }
}
