<?php

namespace App\Services\Provider;

use App\Models\Metric;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class GeneratingReportService
{
    public static function generateReport()
    {
        $metrics = Metric::orderBy('date_month', 'desc')->get();

        if ($metrics->isEmpty()) {
            throw new \Exception('No metrics found across devices.');
        }

        $metricsText = $metrics->map(function ($m) {
            return "Date: {$m->date_month}, Voltage: {$m->voltage}V, Current: {$m->current}A, Power: {$m->power}W, Energy: {$m->energy}kWh";
        })->implode("\n");
    }
}
