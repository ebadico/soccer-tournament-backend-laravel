<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['season_id', 'url', 'type'];

    public function season(){
      return $this->belongsTo('App\Season');
    }
}
