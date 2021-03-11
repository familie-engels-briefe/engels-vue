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

    public function getDiplAttribute($value): string
    {
        return mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }

    protected function sanitize($input): string
    {
        return preg_replace('!\s+!', ' ', trim(strip_tags($input)));
    }

    public function sanitizeHtml(): void
    {
        $this->norm_sanitized = $this->sanitize($this->norm);
        $this->dipl_sanitized = $this->sanitize($this->dipl);
    }
}
