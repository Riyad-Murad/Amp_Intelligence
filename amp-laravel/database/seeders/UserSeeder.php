<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admins
        User::create([
            'slave_id' => null,
            'user_type' => 'Admin',
            'name' => 'Riyad Murad',
            'email' => 'riyad@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '71/111111',
        ]);

        User::create([
            'slave_id' => null,
            'user_type' => 'Admin',
            'name' => 'Nabiha',
            'email' => 'nabiha@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '71/222222',
        ]);

        User::factory(3)->create([
            'user_type' => 'Admin',
            'slave_id' => null,
        ]);

        // Providers
        User::create([
            'slave_id' => null,
            'user_type' => 'Provider',
            'name' => 'Charbel Daoud',
            'email' => 'cdaoud@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '71/333333',
        ]);

        User::create([
            'slave_id' => null,
            'user_type' => 'Provider',
            'name' => 'Taha Taha',
            'email' => 'taha@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '71/444444',
        ]);

        User::create([
            'slave_id' => null,
            'user_type' => 'Provider',
            'name' => 'Nour Mshawrab',
            'email' => 'nour@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '71/555555',
        ]);

        User::factory(2)->create([
            'user_type' => 'Provider',
            'slave_id' => null,
        ]);
    }
}
