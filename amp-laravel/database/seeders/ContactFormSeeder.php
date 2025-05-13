<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ContactForm;
use Illuminate\Database\Seeder;

class ContactFormSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::inRandomOrder()->limit(10)->get();

        foreach ($users as $user) {
            ContactForm::factory()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
