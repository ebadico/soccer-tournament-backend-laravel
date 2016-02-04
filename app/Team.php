<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Team extends Model
{

  protected $fillable = ['name','wins','draws','losts','round_id','season_id'];

 /**
   * Accessors
   */
  public function getIdAttribute($id){
      return Hashids::encode($id);
  }

  public function match(){
    return $this->hasMany('App\Match');
  }
  public function player(){
    return $this->hasMany('App\Player');
  }
}
