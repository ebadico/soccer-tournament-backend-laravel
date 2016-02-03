<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Day extends Model
{
  protected $fillable = ['season_id','round_id'];
 /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }
}
