<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\News;
use App\Medias;

class NewsCtrl extends Controller{

  public function __construct(){
     $this->middleware( 'jwt.auth', ['except' => ['index','show']] );
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    if($type = $request->get('type')){
      return News::where('type', '=', $type)->with('season','featured')->get();
    }

    return News::with('season','featured')->get();
  }


  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request){

      //if update, update, clrly
      if($request->has("id")){
          $news = News::where('id', $request->get('id'))->first();
          $news->fill($request->all());
          $news->save();
      }else{
          $news = News::create($request->all());
      }

      $featured = [];
      foreach (News::where('featured_id', '<>', "null")->get() as $value) {
        array_push($featured, $value->featured_id);
      }
      
      $filenameToDelete = [];
      foreach(Medias::where('type','=','featured')->whereNotIn('id', $featured)->select('filename')->get() as $value){
        array_push($filenameToDelete, $value->filename);
      }
      Medias::where('type','=','featured')->whereNotIn('id', $featured)->delete();

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
  public function update(Request $request, $id){
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
        Medias::where('id', '=', $post->featured_id )->first()->delete();
        $res['status'] = 200;
        $res['message'] = "deleted successful";
      }else{
        $res['status'] = 404;
        $res['message'] = "Error deleting";
      }

      return response()->json($res, $res['status']);
  }
}
