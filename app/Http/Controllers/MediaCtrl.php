<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Medias;
use Storage;
use Flow;
use Image;

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
    /**
     * FEATURED IMAGE OF A POST
     */
    if($request->has('news_id')){
        $media->news_id = $request->get('news_id');
        $media->type = 'featured';   
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

    $filename = $request->getFileName();
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
      $media->fill([
          "path"     => $img['path'],
          "filename" => $img['filename']
      ])->save();

      //resize?? 
      // $crop = Image::make($storage . $img['filename']);
      
      // $crop->resize(50, null, function($constraint){
      //     $constraint->aspectRatio();
      // });
      
      // Storage::delete($img['filename']);

      // $crop->save($storage . $img['filename']);
    
      return response()->json($img, 200);
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
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
      //
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
      //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $media = Medias::find($id);
    if($media->type === 'photo'){
        Storage::delete($media->filename);
    }
    $media->delete();
    $media->exists = false;
    return $media;
  }
}
