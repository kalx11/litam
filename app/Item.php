<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';
    protected $fillable = ['name', 'amount', 'cost', 'description'];

    public function scopeSearch($query, $search) {
        $query->where('name', 'LIKE', "%{$search}%")
              ->orWhere('description', 'LIKE', "%{$search}%")
              ->orWhere('id', 'LIKE', $search);
    }
}
