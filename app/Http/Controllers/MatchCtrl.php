<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Match;
use App\Score;
use App\Season;
use App\Attendance;
use Carbon\Carbon;

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
          'match_date'=> $request->match_date,
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
        return Match::where('id', '=', $id)->with('teamA.player.attendance','teamB.player.attendance','day.round','winner','attendance.player','scores')->first();
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
    

        /**
         * SCORES
         */
        $scores = $request->get('all_scores');
        Score::where('match_id', '=', $request->get('id') )->delete();

        foreach($scores as $score){
            Score::create($score);
        }

        /**
         * ATTENDANCES
         */

        Attendance::where('match_id', '=', $request->get('id') )->delete();

        $team_a = $request->get('team_a');
        $team_b = $request->get('team_b');

        foreach($team_a['player'] as $player){
            if($player['attendance']){
                Attendance::create([
                    'player_id' => $player['id'],
                    'match_id'  => $request->get('id'),
                    'season_id' => $request->get('season_id'),
                ]);
            }
        }
        foreach($team_b['player'] as $player){

            if($player['attendance']){
                Attendance::create([
                    'player_id' => $player['id'],
                    'match_id'  => $request->get('id'),
                    'season_id' => $request->get('season_id'),
                ]);
            }
        }

        /**
         * MATCH
         */

        $result = Match::find($id);

        $result->fill($request->all());

        if($result->save()){
            $res['message'] = "saved";
            $res['obj'] = $result;
            $res['status'] = 200; 
        }else{
           $res['message'] = "error saving"; 
           $res['status'] = 401; 
        }

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
        if($match = Match::where('id', '=', $id)){
            if($match->delete()){
                $res['status'] = 202;
                $res['message'] = 'resource deleted successfully';
            }else{
                $res['status'] = 401;
            }
        }
        return response()->json( $res ,$res['status']);

    }
}
