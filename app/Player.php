<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Player extends Model
{
  protected $fillable = ['name','season_id','team_id'];

  public function attendance(){
    return $this->hasMany('App\Attendance');
  }

  public function team(){
    return $this->belongsTo('App\Team');
  }

}
