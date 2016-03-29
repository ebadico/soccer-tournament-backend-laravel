<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medias extends Model
{
    protected static function boot(){
      parent::boot();

      static::deleting(function($media){
        \Storage::delete($media->filename);
      });
    }

    protected $fillable = ['path','type', 'filename', 'season_id', 'team_id', 'news_id', 'round_id','ext_url'];

    public function getPathAttribute(){
      if($this->attributes['type'] != 'video'){
        return $this->attributes['path'] = ENV('APP_FQDN') . '/uploads/' . $this->attributes['filename'];
      }else{
        return $this->attributes['path'];
      }
    }

    public function season(){
      return $this->belongsTo('App\Season');
    }
}
