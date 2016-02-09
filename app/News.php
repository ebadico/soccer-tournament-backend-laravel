<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = ['title','body','type', 'season_id'];


    public function season(){
      return $this->belongsTo('App\Season');
    }
}
