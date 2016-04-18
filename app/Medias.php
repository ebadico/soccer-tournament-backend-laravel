<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medias extends Model
{
    protected static function boot(){
      parent::boot();

      static::deleting(function($media){
        if($media->type != 'video'){
          \Storage::delete($media->filename);
          if(\Storage::disk('thumb')->delete($media->filename)){
            \Storage::disk('thumb')->exists($media->filename);
          }
        }
      });
    }

    protected $fillable = ['path','type', 'filename', 'season_id', 'team_id', 'news_id', 'round_id','ext_url'];
    protected $appends = ['thumb'];

    public function getPathAttribute(){
      if($this->attributes['type'] != 'video'){
        return $this->attributes['path'] = ENV('APP_FQDN') . '/uploads/' . $this->attributes['filename'];
      }else{
        return $this->attributes['path'];
      }
    }

    public function getThumbAttribute(){
      if($this->attributes['type'] != 'video'){
        return $this->attributes['thumb'] = ENV('APP_FQDN') . '/uploads/thumb/' . $this->attributes['filename'];
      }
      return $this->attributes['thumb'] = null;
    }

    public function season(){
      return $this->belongsTo('App\Season');
    }
}
