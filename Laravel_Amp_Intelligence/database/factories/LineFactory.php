<?php

namespace Database\Factories;

use App\Models\Master;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Line>
 */
class LineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'master_id' => Master::factory(),
            'voltage_l1' => $this->faker->randomFloat(2, 200, 250),
            'voltage_l2' => $this->faker->randomFloat(2, 200, 250),
            'voltage_l3' => $this->faker->randomFloat(2, 200, 250),
            'power_l1' => $this->faker->randomFloat(2, 0, 500),
            'power_l2' => $this->faker->randomFloat(2, 0, 500),
            'power_l3' => $this->faker->randomFloat(2, 0, 500),
        ];
    }
}
