<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Hashids;
use App\Team;
use App\Round;
use App\Season;

class TeamCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->get('round_id')){
            return Team::getFromRound($request->get('round_id'));
        }
        
        return Team::with('round','player')->get();
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
     * request needs round_id and team name
     */
    public function store(Request $request)
    {
        $team = new Team();


        $team->fill([
            'season_id' => Season::getCurrentSeason()->id,
            'name' => $request['name'],
            'round_id' => $request['round_id'],
        ]);

        if($team->save()){
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


        $id = Hashids::decode($id);
        if(!$data = Team::find($id)){
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
        if($team = Team::find($id)){
            if($team->delete()){
                $res['status'] = 202;
                $res['message'] = 'resource deleted successfully';
            }else{
                $res['status'] = 401;
            }
        }
        return response()->json( $res ,$res['status']);

    }
}
