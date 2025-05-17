<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Metric extends Model
{
    use HasFactory;

    protected $fillable = [
        'master_id',
        'slave_id',
        'voltage',
        'current',
        'power',
        'energy',
        'date_month',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function master()
    {
        return $this->belongsTo(Master::class);
    }

    public function slave()
    {
        return $this->belongsTo(Slave::class);
    }
}
