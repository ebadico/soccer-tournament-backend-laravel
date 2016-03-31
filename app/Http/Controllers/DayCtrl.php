<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Day;
use App\Season;
use Hashids;

class DayCtrl extends Controller
{
  public function __construct(){
     $this->middleware('jwt.auth', ['except' => ['index','show']]);
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request){
    if($round_id = $request->get('round_id')){
        return Day::where('round_id','=', $round_id)->get();
    }
    
    if($request->has('last_day')){        
      $dayPerRound = Day::with(
          'round',
          'matches.teamA.media',
          'matches.teamB.media',
          'matches.warning.player',
          'matches.expulsion.player',
          'matches.scores.player'
      )->whereHas('matches', function($query){
          $query->where('played', true);
      })->get()->groupBy('round_id');


      $ids = [];
      $filtered = [];
      
      foreach($dayPerRound as $days){
        $ids = [];
        foreach($days as $day){
          array_push($ids, $day['id']);
        }
        foreach($days as $key => $day){
          if($day['id'] == max($ids)){
            array_push($filtered, $day);
          }
        }
      }
      return $filtered;
    }

    if($request->has('count_please')){
      
      $round_ids = \DB::table('days')->distinct()->select('round_id')->lists('round_id');

      foreach ($round_ids as $round_id) {
        //$cnt = (integer)(Day::where('round_id', $round_id)->first()->count);
        $cnt = 0;
        foreach (Day::where('round_id', $round_id)->get() as $day){
          $day->count = (integer)($cnt + 1);
          $day->save();
          $cnt++;
        }
      }

      return "DONE";
    }

    return Day::with(
        'round',
        'matches.teamA.media',
        'matches.teamB.media',
        'matches.warning.player',
        'matches.expulsion.player',
        'matches.scores.player'
    )->get();
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
      //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request){
    $day = new Day();

    $day->fill([
        'season_id' => Season::getCurrentSeason()->id,
        'round_id'  => $request->round_id
    ]);

    if($day->save()){
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
  public function show($id)
  {
      //
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
      $day = Day::find($id);
      if($day->delete()){
          $res['deleted'] = true;
          $res['status'] = 204;
      }else{
          $res['deleted'] = false;
          $res['status'] = 404;
      }
      return response()->json($res, $res['status']);
  }
}
