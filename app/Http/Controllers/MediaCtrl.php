<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Medias;

use Flow;

class MediaCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        if($type = $request->get('type')){
            return Media::where('type','=', $type)->with('season')->get();
        }

        return Media::with('season')->get();
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

        $res = array();
        $res['filename'] = $request->getFileName();
        $res['size'] = $request->getTotalSize();
        $res['path'] = '/uploads/' . (string)$request->getFileName();

        $media = new Medias();
        $media->fill([
            "path"=> $res['path'] = '/uploads/' . (string)$request->getFileName()
        ]);
        $media->save();

        if (Flow\Basic::save( $storage . $request->getFileName(), $config, $request)) {
          Flow\Uploader::pruneChunks($tmp);
          return response()->json($res, 200);
        } else {
          return response()->json($res, 401);
        }
    }
    public function StoreVideo(Request $request){
       $media = new Medias();
       $media->path = $request->get('url');
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
        //
    }
}
