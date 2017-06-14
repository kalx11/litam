<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Quote extends Model
{
    protected $table = "quotes";
    
    protected $fillable = ['total_cost', 'subtotal', 'status'];

    public function client() {
        return $this->belongsTo('App\Client');
    }

   public  function items() {
        return $this->belongsToMany('App\Item', 'item_quote')->withPivot('amount');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function scopeSearch($query, $search, $type='') {
        return $query->with('client:id,name,surname')->where('status', $type)->whereHas('client', function ($query) use ($search) {
            return $query->where('name', 'LIKE', "%{$search}%")
                         ->orWhere('surname', 'LIKE', "%{$search}%")
                         ->orWhere('id', 'LIKE', "%{$search}%");
        });
    }
}
