<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Attendance extends Model{

  protected $fillable = ['match_id','player_id','season_id'];


 /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }

  public function match(){
    return $this->belongsTo('App\Match');
  }
  public function attendance(){
    return $this->belongsTo('App\Attendance');
  }
}
