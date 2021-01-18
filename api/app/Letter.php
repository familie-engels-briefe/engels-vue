<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Letter extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'title',
        'norm',
        'dipl',
    ];

    public function getNormAttribute($value): string
    {
        return mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }
}
