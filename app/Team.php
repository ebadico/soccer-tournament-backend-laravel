<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
  protected static function boot(){
    parent::boot();
    static::addGlobalScope(new \App\Scopes\SeasonScope);
  }
  protected $fillable = ['name','wins','draws','losts','round_id','season_id'];

  static public function getFromRound($round_id){
    return parent::where('round_id', '=', $round_id)->get();
  }

  public function match(){
    return $this->hasMany('App\Match');
  }
  public function player(){
    return $this->hasMany('App\Player');
  }

  public function round(){
    return $this->belongsTo('App\Round');
  }
}
