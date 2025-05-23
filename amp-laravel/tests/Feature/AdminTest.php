<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Traits\TestTrait;
use App\Models\ContactForm;

class AdminTest extends TestCase
{
    use TestTrait;

    public function testAdminCanGetAllProviders(): void
    {
        $response = $this->actingAsAdmin()->getJson('/api/v1/admins/getAllProviders');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Providers retrieved successfully',
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
                        'updated_at'
                    ]
                ]
            ]);
    }

    public function testAdminCanGetAllContactMessages(): void
    {
        $response = $this->actingAsAdmin()->getJson('/api/v1/admins/getAllContactMessages');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Messages retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'email',
                        'message',
                        'phone_number',
                        'created_at',
                        'updated_at'
                    ]
                ]
            ]);
    }

    public function testAdminCanEditProvider(): void
    {
        $provider = User::factory()->create(['user_type' => 'provider']);

        $payload = [
            'phone_number' => '71-852369'
        ];

        $response = $this->actingAsAdmin()->postJson("/api/v1/admins/editProvider/{$provider->id}", $payload);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => null
            ]);
    }

    public function testAdminCanEditProfile(): void
    {
        $payload = [
            'name' => 'Nabiha'
        ];

        $response = $this->actingAsAdmin()->postJson('/api/v1/admins/editProfile', $payload);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => null
            ]);
    }


    public function testAdminCanDeleteContactMessage(): void
    {
        $user = User::factory()->create(['user_type' => 'client']);

        $contactMessage = ContactForm::factory()->create([]);

        $response = $this->actingAsAdmin()->deleteJson("/api/v1/admins/deleteContactMessage/{$contactMessage->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Message deleted successfully',
                'data' => null
            ]);
    }
}
