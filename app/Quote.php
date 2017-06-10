<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Quote extends Model
{
    protected $table = "quotes";
    protected $fillable = ['total_cost'];

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
}
