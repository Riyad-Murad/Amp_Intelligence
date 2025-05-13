<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Master;
use Illuminate\Database\Seeder;

class MasterSeeder extends Seeder
{
    public function run(): void
    {
        $providers = User::where('user_type', 'Provider')->get();

        foreach ($providers as $provider) {
            Master::factory(2)->create([
                'user_id' => $provider->id,
            ]);
        }
    }
}
