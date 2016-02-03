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

}
