<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Traits\ResponseTrait;

class ProviderTest extends TestCase
{
    use ResponseTrait;

    public function testProviderCanEditOwnProfile(): void
    {
        $providerRequest = $this->actingAsProvider();

        $response = $providerRequest->postJson('/api/v1/providers/editProfile', [
            'name' => 'Riyad Riyad',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => null,
            ]);
    }

    public function testProviderCanEditAUser(): void
    {
        $providerRequest = $this->actingAsProvider();

        $user = User::factory()->create();

        $response = $providerRequest->postJson("/api/v1/providers/editUser/{$user->id}", [
            'name' => 'Riyad Riyad',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => null,
            ]);
    }

    public function testProviderCanGetAllUsers(): void
    {
        $providerRequest = $this->actingAsProvider();

        $provider = User::factory()->create();

        $response = $providerRequest->getJson("/api/v1/providers/getAllUsers/{$provider->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Users retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'slave_id',
                        'user_type',
                        'name',
                        'email',
                        'phone_number',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testProviderCanGetAllMetrics(): void
    {
        $providerRequest = $this->actingAsProvider();

        $provider = User::factory()->create();

        $response = $providerRequest->getJson("/api/v1/providers/getAllMetrics/{$provider->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Metrics retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'slave_id',
                        'power_usage',
                        'voltage',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testProviderCanGetAllLines(): void
    {
        $providerRequest = $this->actingAsProvider();

        $provider = User::factory()->create();

        $response = $providerRequest->getJson("/api/v1/providers/getAllLines/{$provider->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Lines retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'slave_id',
                        'status',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testGetOverviewData()
    {
        $providerRequest = $this->actingAsProvider();

        $provider = User::factory()->create();

        $response = $providerRequest->getJson("/api/v1/providers/overview/{$provider->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'totalClients',
                    'totalPowerThisMonth',
                    'averageVoltageAcrossClients',
                    'latestMetricTimestamp',
                ]
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Overview data retrieved successfully',
            ]);
    }

    public function testGetTotalPowerUsage()
    {
        $providerRequest = $this->actingAsProvider();

        $provider = User::factory()->create();

        $response = $providerRequest->getJson("/api/v1/providers/totalPowerUsage/{$provider->id}");

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'message', 'data'])
            ->assertJson([
                'success' => true,
                'message' => 'Total power usage retrieved successfully',
            ]);
    }
}
