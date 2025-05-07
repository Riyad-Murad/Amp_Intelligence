<?php

namespace App\Services\Client;

use App\Models\Metric;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class GeneratingReportService
{
    public static function generateReport($slaveId)
    {
        $metrics = Metric::where('slave_id', $slaveId)
            ->orderBy('date_month', 'desc')
            ->take(10)
            ->get();

        if ($metrics->isEmpty()) {
            throw new \Exception('No metrics found for the specified device.');
        }
    }
}
