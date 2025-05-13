<?php

namespace Database\Factories;

use App\Models\Slave;
use App\Models\Master;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Metric>
 */
class MetricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'master_id' => null,
            'slave_id' => null,
            'voltage' => $this->faker->randomFloat(2, 200, 250),
            'current' => $this->faker->randomFloat(2, 0, 100),
            'power' => $this->faker->randomFloat(2, 0, 500),
            'energy' => $this->faker->randomFloat(2, 0, 10000),
            'date_month' => $this->faker->date('m-d'),
        ];
    }
}
