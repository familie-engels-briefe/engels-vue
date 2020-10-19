<?php

use Illuminate\Support\Facades\DB;

function read_setting(string $name, $default = null)
{
    $value = DB::table('settings')->where('name', $name)->first();

    if ($value !== null) {
        return $value->value;
    }

    return $default;
}

function write_setting(string $name, $value): bool
{
    $exists = DB::table('settings')->where('name', $name)->exists();

    if ($exists) {
        return DB::table('settings')->where('name', $name)->update([
            'value' => $value,
        ]) > 0;
    } else {
        return DB::table('settings')->insert([
            'name' => $name,
            'value' => $value,
        ]) > 0;
    }
}
