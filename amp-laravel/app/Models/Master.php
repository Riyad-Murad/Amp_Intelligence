<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Master extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function slaves()
    {
        return $this->hasMany(Slave::class);
    }

    public function lines()
    {
        return $this->hasMany(Line::class);
    }

    public function metrics()
    {
        return $this->hasMany(Metric::class);
    }
}
