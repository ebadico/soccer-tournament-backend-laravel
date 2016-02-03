<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
 /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }
}
