<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Match;
use App\Season;
use Hashids;

class MatchCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){

        $day_id = $request->get('day_id');
        $round_id = $request->get('round_id');



        if( $day_id && $round_id ){
            return Match::get_from_filter($day_id, $round_id)->get_all();
        }else if ($day_id){
            return Match::get_from_day($day_id)->get_all();
        }else if ($round_id){
           return Match::get_from_round($round_id)->get_all();
        }else{

        }


        return Match::get_all();
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
      $match = new Match();

      $match->fill([
      'season_id' => Season::getCurrentSeason()->id,
      'team_a_id' => $request->team_a_id,
      'team_b_id' => $request->team_b_id,
      'day_id'    => $request->day_id,
      ]);

      if($match->save()){
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
        //
    }
}
