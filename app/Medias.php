<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medias extends Model
{
    protected $fillable = ['path','type', 'filename', 'season_id', 'team_id', 'news_id',];

    public function season(){
      return $this->belongsTo('App\Season');
    }
}
