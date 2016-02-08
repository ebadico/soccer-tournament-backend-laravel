<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
  protected static function boot(){
    parent::boot();
    static::addGlobalScope(new \App\Scopes\SeasonScope);
  }
  protected $fillable = ['name','season_id','team_id'];
  
  public function attendance(){
    return $this->hasMany('App\Attendance');
  }

  public function team(){
    return $this->belongsTo('App\Team');
  }

}
