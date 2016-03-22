<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Medias;
use Storage;
use Flow;
use Image;

class MediaObserver{

  public function deleting($item){
    \Storage::delete($item->filename);
  }
}

class MediaCtrl extends Controller
{
  public function __construct(){
     $this->middleware('jwt.auth', ['except' => ['index','show','store']]);
  }
  
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
      
      if($type = $request->get('type')){
          return Medias::where('type','=', $type)->with('season')->get();
      }

      return Medias::with('season')->get();
  }


  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {

    $media = new Medias();
    if($request->has('round_id')){
      /**
       * IF A CLUB AVATAR DELETE THE PREVIOUS BEFORE
       */
        if($m = Medias::where('round_id', '=', $request->get('round_id'))->first()){
          $m->delete();
        }
        $media->round_id = $request->get('round_id');
    }
    if($request->has('team_id')){
      /**
       * IF A TEAM AVATAR DELETE THE PREVIOUS BEFORE
       */
        if($m = Medias::where('team_id', '=', $request->get('team_id'))->first()){
          $m->delete();
        }
        $media->team_id = $request->get('team_id');
        $media->type = 'avatar';
    }
    if($request->has('player_id')){
      /**
       * IF A PLAYER AVATAR DELETE THE PREVIOUS BEFORE
       */
        if($m = Medias::where('player_id', '=', $request->get('player_id'))->first()){
          $m->delete();
        }
        $media->player_id = $request->get('player_id');
        $media->type = 'avatar';
    }
    /**
     * MAYBE NEEDED IN FUTURE
     */
    if($request->has('season_id')){
        $media->season_id = $request->get('season_id');
    }
    /**
     * TYPE
     */
    if($request->has('type')){
        $media->type = $request->get('type');
    }
    
    $config = new Flow\Config();
    $request = new Flow\Request();
    $tmp = storage_path() . '/upload_tmp';
    $storage = public_path() . '/uploads/';
    $config->setTempDir( $tmp );

    $filename = strtolower($request->getFileName());

    if (strpos($filename, '.jpg') || strpos($filename, '.jpeg')) {
        $extension = '.jpg';
    }
    if (strpos($filename, '.png')) {
        $extension = '.png';
    }
    if (strpos($filename, '.gif')) {
        $extension = '.gif';
    }

    $img = array();
    $img['filename'] = time() . $extension;
    $img['size'] = $request->getTotalSize();
    $img['path'] = '/uploads/' . $img['filename'];

    if (Flow\Basic::save( $storage . $img['filename'], $config, $request)) {
      //resize?? 
      $crop = Image::make($storage . $img['filename']);
      
      $crop->resize(1920, null, function($constraint){
          $constraint->aspectRatio();
          $constraint->upsize();
      });
      
      Storage::delete($img['filename']);

      $crop->save($storage . $img['filename']);
      $media->fill([
          "path"     => $img['path'],
          "filename" => $img['filename']
      ])->save();

    
      return response()->json($media, 200);
    } else {
      return response()->json($img, 401);
    }
  }
  public function StoreVideo(Request $request){
     $media = new Medias();
     $media->path = 'https://www.youtube.com/v/' . $request->get('url');
     $media->type = "video";
     if($media->save()){
      return response()->json($media, 200);
     }else{
      return response()->json(["error"=>"error"], 401);
     }

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
      if($request->has('ext_url')){
        $media = Medias::where('id', $id)->first();
        $media->ext_url = $request->get('ext_url');
        $media->save();
      }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $media = Medias::where('id', $id)->first();
    $media->delete();
    $media->exists = false;
    return $media;
  }
}
