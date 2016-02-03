<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Score extends Model{

  protected $fillable = ['team_id','player_id','match_id','season_id'];


  /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }
}
