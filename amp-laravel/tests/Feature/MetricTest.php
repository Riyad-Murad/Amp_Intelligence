<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MetricTest extends TestCase
{
    use WithFaker;

    public function testSubmitSlaveMetricsSuccessfully(): void
    {
        $payload = [
            'power' => "10",
            'energy' => "30",
            'voltage' => "220",
            'current' => "20",
            'master_id' => 1,
            'date_month' => "05-16",
            'slave_id' => 1
        ];

        $response = $this->postJson('http://localhost:8000/api/v1/metrics', $payload);

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
}
