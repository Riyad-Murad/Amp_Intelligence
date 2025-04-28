<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Metric extends Model
{
    use HasFactory;

    public function master()
    {
        return $this->belongsTo(Master::class);
    }

    public function slave()
    {
        return $this->belongsTo(Slave::class);
    }
}
