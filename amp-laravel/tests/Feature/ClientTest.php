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
}
