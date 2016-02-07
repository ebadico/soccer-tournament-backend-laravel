<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hashids;

class Round extends Model
{
 
  protected $fillable = ['name','season_id', 'current'];


  public function days(){
    return $this->belongsTo('App\Day');
  }  
}
