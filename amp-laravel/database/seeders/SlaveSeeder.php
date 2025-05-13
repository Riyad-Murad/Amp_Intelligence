<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Slave;
use App\Models\Master;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SlaveSeeder extends Seeder
{
    public function run(): void
    {
        $masters = Master::all();

        // Predefined clients to be created (first 3)
        $predefinedClients = [
            [
                'name' => 'Gheeda Abou Chakra',
                'email' => 'gheeda@gmail.com',
                'phone_number' => '71/666666',
            ],
            [
                'name' => 'Joseph Matta',
                'email' => 'joe@gmail.com',
                'phone_number' => '71/777777',
            ],
            [
                'name' => 'Sara Bassil',
                'email' => 'sara@gmail.com',
                'phone_number' => '71/888888',
            ],
        ];

        $faker = \Faker\Factory::create();
        $clientIndex = 0;

        foreach ($masters as $master) {
            // Create 2 slaves per master = 10 total
            for ($i = 0; $i < 2; $i++) {
                $slave = Slave::create([
                    'master_id' => $master->id,
                    'modbus_id' => Slave::max('modbus_id') + 1, // Auto-increment manually
                ]);

                // Use predefined clients first, then faker
                if ($clientIndex < count($predefinedClients)) {
                    $client = $predefinedClients[$clientIndex];
                    $clientIndex++;

                    User::create([
                        'slave_id' => $slave->id,
                        'user_type' => 'Client',
                        'name' => $client['name'],
                        'email' => $client['email'],
                        'password' => Hash::make('password'),
                        'phone_number' => $client['phone_number'],
                    ]);
                } else {
                    User::create([
                        'slave_id' => $slave->id,
                        'user_type' => 'Client',
                        'name' => $faker->name,
                        'email' => $faker->unique()->safeEmail,
                        'password' => Hash::make('password'),
                        'phone_number' => $faker->phoneNumber,
                    ]);
                }
            }
        }
    }
}
