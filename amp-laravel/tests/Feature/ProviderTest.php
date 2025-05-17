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
}
