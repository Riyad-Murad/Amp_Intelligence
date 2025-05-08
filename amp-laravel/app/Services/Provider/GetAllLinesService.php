<?php

namespace App\Services\Provider;

use App\Models\Line;

class GetAllLinesService
{
    public static function getAll()
    {
        return Line::all();
    }
}
