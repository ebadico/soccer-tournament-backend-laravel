<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Match extends Model{
  protected static function boot(){
    parent::boot();
    static::addGlobalScope(new \App\Scopes\SeasonScope);
  }
  protected $table = 'matchs'; 
  protected $date = ['match_date'];
  protected $fillable = ['season_id','team_a_id','team_b_id','day_id', 'match_date','winner_id'];

  public function setMatchDateAttribute($startDate) {
    $this->attributes['match_date'] = Carbon::parse($startDate)->toDateTimeString();
  }

  static public function getFromDay($day_id){
    return parent::where('day_id', '=', $day_id)->get();

  }

  public function scopeGet_from_day($query, $day_id){
    return $query->where('day_id', '=', $day_id);
  }

  public function scopeGet_from_round($query, $round_id){
    return $query->whereHas('day', function($query) use($round_id){
      $query->where('round_id', "=", $round_id);
    });
  }

  public function scopeGet_from_filter($query, $day_id, $round_id){
   return $query->whereHas('day', function($query) use($round_id, $day_id){
      $query->where('round_id', "=", $round_id)->where('id','=', $day_id);
    });
  }

  /** OMG I SHOULD MAYBE DO LESS QUERY IN ONE SHOT */
  /** bah who cares, it's a low traffic app */
  public function scopeGet_all($query){
      return $query->with('teamA.player.attendance','teamB.player.attendance','day.round','winner','attendance.player','scores','teamA.player.warning','teamA.player.expulsion', 'teamB.player.warning','teamB.player.expulsion')->get();
  }
  public function scopePopulate($query){
      return $query->with('teamA.player.attendance','teamB.player.attendance','day.round','winner','attendance.player','scores','teamA.player.warning','teamA.player.expulsion', 'teamB.player.warning','teamB.player.expulsion')->first();
  }


  /**
   * RELATIONSHIPS
   */
  public function day(){
    return $this->belongsTo('App\Day');
  }

  public function teamA(){
    return $this->belongsTo('App\Team');
  }

  public function teamB(){
    return $this->belongsTo('App\Team');
  }
  public function  winner(){
    return $this->belongsTo('App\Team');
  } 
  public function attendance(){
    return $this->hasMany('App\Attendance');
  } 
  public function scores(){
    return $this->hasMany('App\Score');
  }

  public function warning(){
    return $this->hasMany('App\Warning');
  }
  public function expulsion(){
    return $this->hasMany('App\Expulsion');
  }
}
