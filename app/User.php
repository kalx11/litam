<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'rol', 'type', 'code'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * scope para buscar usuarios
     * @param $query
     * @param $search
     * @return mixed
     */
    public function scopeSearch($query, $search) {
       return $query->where('name', 'LIKE', "%{$search}%")
              ->orWhere('id', 'LIKE', $search)
              ->orWhere('email', 'LIKE', "%{$search}%")
              ->orWhere('code', 'LIKE', "%{$search}%");
    }
}
