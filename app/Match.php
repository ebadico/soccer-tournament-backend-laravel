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

  public function team(){
    return $this->belongsTo('App\Team');
  }
  public function day(){
    return $this->belongsTo('App\Day');
  }
  public function attendance(){
    return $this->belongsTo('App\Attendance');
  }
}
