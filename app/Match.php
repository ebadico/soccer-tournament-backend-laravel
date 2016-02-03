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
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }
}
