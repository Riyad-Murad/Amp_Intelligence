<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Auth;

class ClientTest extends TestCase
{
    use ResponseTrait;

    public function testClientCanEditProfile(): void
    {
        [$clientRequest, $client] = $this->actingAsClient();

        $response = $clientRequest->postJson('/api/v1/clients/editProfile', [
            'name' => 'Gheeda',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => null,
            ]);
    }

    public function testClientCanGetDashboardData(): void
    {
        [$clientRequest, $client] = $this->actingAsClient();

        $response = $clientRequest->getJson("/api/v1/clients/clientDashboardData/{$client->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Dashboard data fetched successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'powerUsagePerDay',
                    'cumulativePowerUsage',
                    'totalPowerUsageThisMonth',
                    'averageVoltageReach',
                    'expectedPowerLimit',
                ],
            ]);
    }
}
