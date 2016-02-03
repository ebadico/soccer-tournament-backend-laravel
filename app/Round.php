<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hashids;

class Round extends Model
{
 
  protected $fillable = ['name','season_id'];

  /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }
  
}
