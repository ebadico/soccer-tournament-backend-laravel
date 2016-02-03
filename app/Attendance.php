<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
 /**
   * Accessors
   */
  public function getIdAttribute($id)
  {
      return Hashids::encode($id);
  }
}
