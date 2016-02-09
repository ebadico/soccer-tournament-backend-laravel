<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medias extends Model
{
    protected $fillable = ['path','type', 'season_id'];
}
