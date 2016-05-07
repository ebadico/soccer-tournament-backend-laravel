<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Day extends Model
{

  protected static function boot(){
      parent::boot();
      static::addGlobalScope(new \App\Scopes\SeasonScope);
  }

  protected $fillable = ['season_id','round_id','num'];

  public function round(){
    return $this->belongsTo('App\Round');
  }

  public function matches(){
    return $this->hasMany('App\Match');
  }
}