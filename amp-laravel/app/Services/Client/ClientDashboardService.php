<?php

namespace App\Services\Client;

use DateTime;
use DateTimeZone;
use App\Models\Metric;

class ClientDashboardService
{
    public static function getDashboardData($slaveId)
    {
        $timezone = new DateTimeZone('Asia/Beirut');
        $startOfMonth = (new DateTime('first day of this month', $timezone))->format('Y-m-d H:i:s');
        $endOfMonth = (new DateTime('last day of this month', $timezone))->format('Y-m-d 23:59:59');

        
    }
}
