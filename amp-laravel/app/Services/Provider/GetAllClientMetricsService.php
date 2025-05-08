<?php

namespace App\Services\Provider;

use App\Models\Metric;

class GetAllClientMetricsService
{
    public static function getAll()
    {
        return Metric::all();
    }
}
