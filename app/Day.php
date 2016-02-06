<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Day extends Model
{
  protected $fillable = ['season_id','round_id'];


  public function round(){
    return $this->hasOne('App\Round', 'id', 'round_id');
  }
}
