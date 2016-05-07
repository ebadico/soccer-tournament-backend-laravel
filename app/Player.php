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
  protected $appends = ['team','scores'];
  
  public function getTeamAttribute(){
    return $this->attributes['team'] = \DB::table('teams')->select('id','name', 'round_id')->where('id', $this->team_id)->first();
  }
  public function getScoresAttribute(){
    return $this->attributes['scores'] = \DB::table('scores')->select('id','player_id')->where('player_id', $this->id)->count();
  }

  public function attendance(){
    return $this->hasMany('App\Attendance');
  }

  public function scores(){
    return $this->hasMany('App\Score');
  }

  public function team(){
    return $this->belongsTo('App\Team');
  }

  public function media(){
    return $this->hasOne('App\Medias', 'player_id', 'id');
  }

  public function warning(){
    return $this->hasMany('App\Warning');
  }
  public function expulsion(){
    return $this->hasMany('App\Expulsion');
  }

}
