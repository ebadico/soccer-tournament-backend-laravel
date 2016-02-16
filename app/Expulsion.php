<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expulsion extends Model
{
  protected $fillable = ['player_id', 'match_id'];

  public function player(){
    return $this->hasOne('App\Player');
  }
  public function match(){
    return $this->hasOne('App\Match');
  }
}
