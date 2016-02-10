<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Medias;
use Storage;
use Flow;

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
        $tmp = storage_path() . '/upload_tmp';
        $storage = public_path() . '/uploads/';

        $config = new Flow\Config();
        $request = new Flow\Request();
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

        $media = new Medias();
        $media->fill([
            "path"=> $img['path'],
            "filename" => $img['filename']
        ]);
        $media->save();

        if (Flow\Basic::save( $storage . $img['filename'], $config, $request)) {
          Flow\Uploader::pruneChunks($tmp);
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
