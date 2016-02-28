<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Prize;

class PrizeCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Prize::with('season','media')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        
        if($request->has('id')){
            $prize = Prize::where('id', $request->get('id'))->first();
        }else{
            $prize = new Prize();
        }

        $prize->fill($request->all());
        if($request->has('season_id')){
            $prize->season_id = \App\Season::getCurrentSeason()->id;
        }

        if($prize->save()){
            return response()->json(['saved'=> "true"], 200);
        }else{
            return response()->json(['saved'=> "false"], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $prize = Prize::where('id','=',$id)->first();

        if($prize->media_id){
            $media = \App\Medias::where('id', $prize->media()->first()->id )->first();
        }

        if($prize->delete()){
            if(isset($media)) $media->delete();
            return response()->json(['removed'=>'true'], 200);
        }else{
            return response()->json(['removed'=>'false'], 400);
        }
    }
}
