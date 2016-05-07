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
    public function __construct(){
       $this->middleware('jwt.auth', ['except' => ['index','show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->get('round_id')){
            return Team::get_round($request->get('round_id'))->get_all();
        }

        if($request->has('all')){
            return Team::get_all();
        }

        return Team::with('round','media','group_photo')->get();
        
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


        if(!$data = Team::where('id','=',$id)->populate()  ){
            $data['error'] = 'Item Not Found';
            $status = 404;
        }
        $status = 200;

        return response()->json($data, $status);
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

        if($team = Team::where('id', '=', $id)->first()){
            $team->fill($request->all());
            if($team->save()){
                $res['status'] = 202;
                $res['message'] = 'resource updated successfully';
            }else{
                $res['status'] = 401;
                $res['message'] = 'error updating model';
            }
        }
        return response()->json( $res ,$res['status']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ( $team = Team::where('id', '=', $id)->first() ){
            if ($team->media()->get()->count()) {
                $team->media()->first()->delete();
            }
            if ($team->group_photo()->get()->count()) {
                $team->group_photo()->first()->delete();
            }

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
