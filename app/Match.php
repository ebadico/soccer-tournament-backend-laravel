<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hashids;

class Match extends Model
{
  protected $table = 'matchs'; 
  protected $fillable = ['season_id','team_a_id','team_b_id','day_id'];
 /**
   * Accessors
   */
    // ACCESSORS
  public function getHashidAttribute(){
      return Hashids::encode($this->attributes["id"]);
  }
  public function getIdAttribute($id){
      return Hashids::encode($id);
  }
  public function getTeamAIdAttribute($id){
      return Hashids::encode($id);
  }
  public function getTeamBIdAttribute($id){
      return Hashids::encode($id);
  }
  public function getDayIdAttribute($id){
      return Hashids::encode($id);
  }
  public function getSeasonIdAttribute($id){
      return Hashids::encode($id);
  }

  public function day(){
    return $this->belongsTo('App\Day');
  }
}
