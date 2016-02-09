<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use  App\Season;
use Hashids;
use Input;

class SeasonCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->get('current')){
            return Season::getCurrentSeason(); 
        }

        return Season::with('team','round','player','day')->get();
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
    public function store(Request $request)
    {
        $season = new Season();
        if (!Season::all()->count()){
            $season->current = 1;
        }
        $season->year = $request->get('year');
        
        if($season->save()){
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
        $id = Hashids::decode($id);
        if(!$data = Season::find($id)){
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
        $id = $request->get('id');
        $season = Season::where('current','=', '1')->first();
        $season->current = 0;
        $season->save();
        $season = Season::find($id);
        $season->current = 1;
        $season->save();

        return 200;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if($season = Season::find($id)){
            if($season->delete()){
                $res['status'] = 202;
                $res['message'] = 'resource deleted successfully';
            }else{
                $res['status'] = 401;
            }
        }
        return response()->json( $res ,$res['status']);

    }
}
