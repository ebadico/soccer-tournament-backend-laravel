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
  protected $fillable = ['season_id','team_a_id','team_b_id','day_id', 'match_date','winner_id','played'];
  protected $appends = ['date','hour'];
  protected $date = ['match_date'];

  
  public function setMatchDateAttribute($date){
    $EU_ROME = new Carbon($date);
    return $this->attributes['match_date'] = $EU_ROME->timezone('Europe/Rome');
  }

  public function getDateAttribute(){
    return $this->attributes['date'] = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['match_date'])->format('d-m-Y');
  }
  public function getHourAttribute(){
    $hour = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['match_date'])->hour;
    $minute = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['match_date'])->minute;
    if($minute < 10){
      $minute = '0' . $minute;
    }
    $complete = $hour . ':' . $minute;
    return $this->attributes['hour'] = $complete;
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

  public function scopePlayed($query){
    return $query->where('played', true);
  }
  

  /** OMG I SHOULD MAYBE DO LESS QUERY IN ONE SHOT */
  /** bah who cares, it's a low traffic app */
  public function scopeGet_all($query){
      return $query->with(
        'teamA.media',
        'teamB.media',
        'teamA.player.attendance',
        'teamB.player.attendance',
        'teamA.player.warning',
        'teamA.player.expulsion',
        'teamB.player.warning',
        'teamB.player.expulsion',
        'day.round',
        'winner',
        'attendance.player',
        'scores'
        )->get();
  }
  public function scopePopulate($query){
      return $query->with(
        'teamA.media',
        'teamB.media',
        'teamA.player.attendance', 
        'teamB.player.attendance', 
        'teamA.player.warning', 
        'teamA.player.expulsion', 
        'teamB.player.warning', 
        'teamB.player.expulsion',
        'day.round', 
        'winner', 
        'attendance.player', 
        'scores'
        )->first();
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
