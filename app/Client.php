<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['name', 'surname', 'type', 'address',
        'code', 'city', 'phone', 'email'];


    public function scopeSearch($query, $search) {
        return $query->where('name', 'LIKE', "%{$search}%")
                     ->orWhere('surname', 'LIKE', "%{$search}%")
                     ->orWhere('code', 'LIKE', "%{$search}%")
                     ->orWhere('address', 'LIKE', "%{$search}%")
                     ->orWhere('city', 'LIKE', "%{$search}%")
                     ->orWhere('phone', 'LIKE', "%{$search}%");
    }

    public function quotes() {
        return $this->hasMany('App\Quote');
    }
}
