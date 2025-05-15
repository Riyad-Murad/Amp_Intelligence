<?php

namespace App\Services\Provider;

use App\Models\Line;
use App\Models\Master;

class GetAllLinesService
{
    public static function getAll(int $providerId)
    {
        $masterIds = Master::where('user_id', $providerId)->pluck('id');
        return Line::whereIn('master_id', $masterIds)->get();
    }
}
