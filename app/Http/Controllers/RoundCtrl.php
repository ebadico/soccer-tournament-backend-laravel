<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Round;
use App\Season;

use Hashids;

class RoundCtrl extends Controller
{
  public function __construct(){
   $this->middleware('jwt.auth', ['except' => ['index','show']]);
 }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Round::with('day','team','media')->get();
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(){
      //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request){
    $round = new Round();

    $round->fill([
      'season_id' => Season::getCurrentSeason()->id,
      'name' => $request->name,
      'club' => $request->club
      ]);

    if($round->save()){
      $res['saved'] = true;
      $res['status'] = 200;
    }
    return response()->json($res, $res['status']);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id){
    if(!$data = Round::where('id','=', $id)->with('day','team','media')->first()){
      $data['error'] = 'Item Not Found';
      $status = 404;
    }
    $status = 200;

    return response()->json($data, $status);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
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
    $name = $request->get('name');
    $club = $request->get('club');

    $round = Round::where('id', '=', $id)->first();

    $round->name = $name;
    $round->club = $club;

    if(!$round->save()){
      $res['err'] = 'Cannot edit document';
      $res['status'] = 401;
    }

    $res['status'] = 200;

    return response()->json($res, $res['status']);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    if($round = Round::find($id)){
      if ($round->media()->get()->count()) $round->media()->first()->delete();
      if($round->delete()){
        $res['status'] = 202;
        $res['message'] = 'resource deleted successfully';
      }else{
        $res['status'] = 401;
      }
    }
    return response()->json( $res ,$res['status']);

  }
}
