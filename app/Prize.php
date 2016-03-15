<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prize extends Model{
    protected $fillable = ['title', 'description', 'type', 'media_id','season_id'];

    public function media(){
      return $this->belongsTo('App\Medias', 'media_id', 'id');
    }

    public function season(){
      return $this->belongsTo('App\Season');
    }
}
