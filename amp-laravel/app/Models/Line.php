<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Line extends Model
{
    use HasFactory;

    protected $fillable = [
        'voltage_l1',
        'voltage_l2',
        'voltage_l3',
        'power_l1',
        'power_l2',
        'power_l3',
    ];

    public function master()
    {
        return $this->belongsTo(Master::class);
    }
}
