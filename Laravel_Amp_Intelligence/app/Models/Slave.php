<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Slave extends Model
{
    use HasFactory;

    public function master()
    {
        return $this->belongsTo(Master::class);
    }

    public function metrics()
    {
        return $this->hasMany(Metric::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
