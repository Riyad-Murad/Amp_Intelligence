<?php

namespace Database\Seeders;

use App\Models\Line;
use App\Models\Master;
use Illuminate\Database\Seeder;

class LineSeeder extends Seeder
{
    public function run(): void
    {
        $masters = Master::all();

        foreach ($masters as $master) {
            Line::factory(6)->create([
                'master_id' => $master->id,
            ]);
        }
    }
}
