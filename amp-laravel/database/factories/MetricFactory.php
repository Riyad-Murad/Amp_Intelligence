<?php

namespace Database\Factories;

use DateTime;
use DateInterval;
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
            'date_month' => function () {
                $today = new DateTime();
                $startOfMonth = (new DateTime())->modify('first day of this month');
                $daysRange = (int)$today->format('d') - 1; // from day 1 to today

                if ($daysRange === 0) {
                    $randomDate = $startOfMonth;
                } else {
                    $randomDate = (clone $startOfMonth)->add(new DateInterval('P' . rand(0, $daysRange) . 'D'));
                }

                return $randomDate->format('m-d');
            }
        ];
    }
}
