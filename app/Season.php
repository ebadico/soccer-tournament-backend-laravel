<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Season extends Model
{

    /**
     * Accessors
     */
    public function getIdAttribute($id)
    {
        return Hashids::encode($id);
    }

    static public function getCurrentSeason(){
      $id = parent::where('current', '=', 1)->get();
      return \Hashids::decode($id[0]->id)[0];
    }

}
