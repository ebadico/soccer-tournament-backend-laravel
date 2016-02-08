<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Season extends Model
{

  static public function getCurrentSeason(){
    $id = parent::where('current', '=', 1)->first();
    return $id;
  }

  public function attendance(){
    return $this->hasMany('App\Attendance');
  }
  public function day(){
    return $this->hasMany('App\Day');
  }
  public function match(){
    return $this->hasMany('App\Match');
  }
  public function player(){
    return $this->hasMany('App\Player');
  }
  public function round(){
    return $this->hasMany('App\Round');
  }
  public function Score(){
    return $this->hasMany('App\Score');
  }
  public function team(){
    return $this->hasMany('App\Team');
  }

}
