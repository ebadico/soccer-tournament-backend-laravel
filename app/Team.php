<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Match;

class Team extends Model
{
  protected static function boot(){
    parent::boot();
    static::addGlobalScope(new \App\Scopes\SeasonScope);
  }
  protected $fillable = ['name', 'wins', 'draws', 'losts', 'round_id', 'season_id', 'group_photo_id'];

  protected $appends = ['points','last_matchs', 'all_scores'];

  public function getAllScoresAttribute(){
    return $this->attributes['all_scores'] = $this->scores()->count();
  }

  public function getLastMatchsAttribute(){
    $matches = Match::where(function($query){
        $query->where('team_a_id', '=', $this->attributes['id'])
              ->whereOr('team_b_id', '=', $this->attributes['id']);
      })
      ->played()
      ->limit(3)
      ->get();
                
    return $this->attributes["last_matchs"] = $matches;
  }

  public function getPointsAttribute(){
    $points = ($this->attributes["wins"] * 3) + ($this->attributes["draws"] * 1);
    return $this->attributes["points"] = $points;
  }

  public function getWinsAttribute(){
    $won = Match::where('winner_id', '=', $this->id)->played()->count();
    return $this->attributes["wins"] = $won;
  }
  
  public function getDrawsAttribute(){
    $draws = Match::whereNull('winner_id')
                  ->where(function($query){
                    $query
                      ->where('team_a_id', '=', $this->id)
                      ->orWhere('team_b_id','=', $this->id);
                  })
                  ->played()
                  ->count();
    return $this->attributes["draws"] = $draws;
  }

  public function getLostsAttribute(){
    $losts = Match::where(function($query){
                    $query
                      ->where('team_a_id', '=', $this->id)
                      ->orWhere('team_b_id','=', $this->id);
                  })
                  ->where(function($query){
                    $query
                      ->whereNotNull('winner_id')
                      ->where('winner_id', '<>', $this->id);
                  })
                  ->played()
                  ->count();
    return $this->attributes['losts'] = $losts;
  }


  public function scopeGet_round($query, $round_id){
    return $query->where('round_id', '=', $round_id);
  }

  public function scopeGet_all($query){
    return $query->with(
      'round',
      'player.attendance',
      'player.scores',
      'player.warning',
      'player.expulsion',
      'player.media',
      'media',
      'group_photo',
      'won_match'
    )->get();
  }
  public function scopePopulate($query){
    return $query->with(
      'round',
      'player.attendance',
      'player.scores',
      'player.warning',
      'player.expulsion',
      'player.media',
      'media',
      'group_photo',
      'won_match'
      )->first();
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

  public function media(){
    return $this->hasOne('App\Medias');
  }

  public function group_photo(){
    return $this->belongsTo('App\Medias');
  }

  public function scores(){
    return $this->hasMany('App\Score');
  }

  public function won_match(){
    return $this->hasMany('App\Match', 'winner_id', 'id');
  }
}
