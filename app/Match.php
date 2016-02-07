<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hashids;
use Carbon\Carbon;

class Match extends Model
{
  protected $table = 'matchs'; 
  protected $date = ['match_date'];
  protected $fillable = ['season_id','team_a_id','team_b_id','day_id', 'match_date'];

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

  public function scopeGet_all($query){
      return $query->with('day.round','teamA','teamB')->get();
  }
  public function scopePopulate($query){
      return $query->with('day.round','teamA','teamB');
  }




  public function day(){
    return $this->hasOne('App\Day','id','day_id');
  }

  public function teamA(){
    return $this->hasOne('App\Team','id','team_a_id');
  }

  public function teamB(){
    return $this->hasOne('App\Team','id','team_b_id');
  }

}
