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
    public function index()
    {
        $matches = Match::all();
        foreach ($matches as $key => $value) {
            $matches[$key]['day'] = Match::find( Hashids::decode($matches[$key]['day_id'])[0] )->day;
        } 
        return $matches;
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
      'season_id' => Season::getCurrentSeason(),
      'team_a_id' => Hashids::decode($request->team_a_id)[0],
      'team_b_id' => Hashids::decode($request->team_b_id)[0],
      'day_id'    => Hashids::decode($request->day_id)[0],
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
