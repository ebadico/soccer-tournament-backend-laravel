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
 
  protected $fillable = ['name','season_id', 'current'];

  public function days(){
    return $this->belongsTo('App\Day');
  }  
}
