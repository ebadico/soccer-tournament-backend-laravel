<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Player extends Model
{
  protected $fillable = ['name','season_id','team_id'];
 /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }

  public function attendance(){
    return $this->hasMany('App\Attendance');
  }

}
