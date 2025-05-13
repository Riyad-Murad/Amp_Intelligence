<?php

namespace Database\Seeders;

use App\Models\Slave;
use App\Models\Metric;
use Illuminate\Database\Seeder;

class MetricSeeder extends Seeder
{
    public function run(): void
    {
        $slaves = Slave::all();

        foreach ($slaves as $slave) {
            $masterId = $slave->master_id;

            Metric::factory(20)->create([
                'slave_id' => $slave->id,
                'master_id' => $masterId,
            ]);
        }
    }
}
