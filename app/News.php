<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
  protected $fillable = ['title','body','type', 'season_id', 'featured_id','excerpt'];


  public function season(){
    return $this->belongsTo('App\Season');
  }
  public function featured(){
    return $this->hasOne('App\Medias', 'id', 'featured_id');
  }
}
