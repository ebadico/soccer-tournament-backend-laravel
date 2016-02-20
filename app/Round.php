<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\SeasonScope;

class Round extends Model
{
  protected static function boot(){
      parent::boot();
      static::addGlobalScope(new SeasonScope);
  }
 
  protected $fillable = ['name','season_id', 'club'];

  public function day(){
    return $this->hasMany('App\Day');
  } 

  public function team(){
    return $this->hasMany('App\Team');
  }

  public function media(){
    return $this->hasOne('App\Medias', 'round_id', 'id');
  }
}
