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
      $last_day = [];
      //get all rounds id
      $all_rounds = \DB::table('days')->distinct()->select('round_id')->lists('round_id');
      foreach ($all_rounds as $round_id) {
        //get last played day in this round
        $round_last_day = Day::where('round_id', $round_id)
        ->whereHas('matches', function($query){
          $query->where('played', true);
        })
        ->get()
        ->max('id');
        array_push($last_day, $round_last_day);
      }
      // >> this is slow <<
      return Day::with(
        'round',
        'matches.teamA.media',
        'matches.teamB.media',
        'matches.warning',
        'matches.expulsion',
        'matches.scores'
      )
      ->whereIn('id', $last_day)
      ->get();
    }

    if($request->has('plain')){
      return Day::with(
        'round',
        'matches.teamA.media',
        'matches.teamB.media',
        'matches.warning',
        'matches.expulsion',
        'matches.scores'
      )->get();
      // return Day::with([
      //   'round' => function($query){},
      //   'matches.teamA.media' => function($query){},
      //   'matches.teamB.media' => function($query){},
      //   'matches.warning' => function($query){},
      //   'matches.expulsion' => function($query){},
      //   'matches.scores' => function($query){}
      // ])->get();
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

    if(Day::where('round_id', $day->round_id)->count()){
      $day->count = (integer)(Day::where('round_id', $day->round_id)->get()->last()->count) + 1;
    }else{
      $day->count = 1;
    }

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
