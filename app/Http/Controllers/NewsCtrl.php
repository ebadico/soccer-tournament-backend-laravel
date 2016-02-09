<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\News;

class NewsCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      if($type = $request->get('type')){
        return News::where('type', '=', $type)->with('season')->get();
      }

      return News::all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        
        $news = News::create($request->all());

        if($news){
          $res['status'] = 200;
          $res['message'] = "saved";
          $res['item'] = $news;
        }else{
          $res['status'] = 401;
          $res['message'] = "cannot save";
        }

        return response()->json($res, $res['status']);
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
        $post = News::find($id);
        if($post->delete()){
          $res['status'] = 200;
          $res['message'] = "deleted successful";
        }else{
          $res['status'] = 404;
          $res['message'] = "Error deleting";
        }

        return response()->json($res, $res['status']);
    }
}
