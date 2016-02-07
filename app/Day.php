<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Day extends Model
{
  protected $fillable = ['season_id','round_id','num'];

  public function round(){
    return $this->belongsTo('App\Round');
  }
}
