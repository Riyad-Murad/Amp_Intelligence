<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Slave;
use App\Models\Master;
use App\Models\Metric;
use App\Models\Line;
use App\Models\ContactForm;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Users
        $users = User::factory(10)->create();

        // Create Masters for each User
        $users->each(function ($user) {
            $masters = Master::factory(2)->create([
                'user_id' => $user->id,
            ]);

            $masters->each(function ($master) use ($user) {
                // Create Slaves for each Master
                $slaves = Slave::factory(2)->create([
                    'master_id' => $master->id,
                ]);

                // Assign a random slave to the user (only for Clients maybe)
                if ($user->user_type === 'Client') {
                    $user->slave_id = $slaves->random()->id;
                    $user->save();
                }

                // Create Metrics for each Slave
                $slaves->each(function ($slave) use ($master) {
                    Metric::factory(5)->create([
                        'master_id' => $master->id,
                        'slave_id' => $slave->id,
                    ]);
                });

                // Create Lines for each Master
                Line::factory(3)->create([
                    'master_id' => $master->id,
                ]);
            });
        });

        // Create ContactForms for random users
        ContactForm::factory(10)->create([
            'user_id' => User::inRandomOrder()->first()->id,
        ]);
    }
}
