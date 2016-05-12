<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Player;
use App\Season;
Use Cache;


class PlayerCtrl extends Controller
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
      // filtered per round
      if($request->has('round_id') && !$request->has('top_scorers')){
        return Player::whereHas('team', function($query) use($request) {
          $query->where('round_id', $request->get('round_id'));
        })->with('scores')->get();
      }

      if($request->has('scorers')){
        return Player::with('scores', 'team.round')->get()->groupBy('team.round_id');
      }

      if($request->has('plain')){
        return Cache::rememberForever('players_plain', function(){
          return Player::with('media')->get()->toArray();
        });
      }

      if($request->has('top_scorers') && $request->has('round_id')){
        // SELECT *
        // FROM
        // (
        //   SELECT p.team_id, teams.round_id, p.name, teams.name as team_name, COUNT(p.id) as scores
        //   FROM players as p
        //   LEFT JOIN teams
        //   ON team_id = teams.id
        //   LEFT JOIN scores as s
        //   ON s.player_id = p.id
        //   GROUP BY p.id
        // ) player
        // WHERE player.round_id = 6
        // ORDER BY scores desc
        // LIMIT 3;
        $round_id = $request->get('round_id');
        return Cache::rememberForever('top_scorers_round_id=' . $round_id, function() use($round_id){
          return \DB::table('players as p')
                            ->where('round_id', $round_id)
                            ->selectRaw('p.team_id, teams.round_id, p.name, teams.name as team_name, COUNT(p.id) as scores')
                            ->leftJoin('teams', 'team_id', '=', 'teams.id')
                            ->leftJoin('scores as s', 's.player_id', '=', 'p.id')
                            ->groupBy('p.id')
                            ->orderBy('scores','desc')
                            ->limit(3)
                            ->get();
        });
      }

      return Player::with('media','attendance','scores','warning','expulsion')->get();
      //return Player::with('media','attendance.match','scores.match','warning','expulsion')->get();
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
    $player = new Player();

    $player->fill([
        'name' => $request->name,
        'season_id' => Season::getCurrentSeason()->id,
        'team_id' => $request->team_id,
    ]);

    if($player->save()){
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
      if(!$data = Player::where('id','=',$id)->with('team.round', 'media','attendance.match','scores.match','warning','expulsion')->first()  ){
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
  public function update(Request $request, $id){
    if($player = Player::where('id', '=', $id)->first()){
      $player->name = $request->get('name');
      //$player->round_id = $request->get('round_id');
      if($player->save()){
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
      if($player = Player::find($id)){
        if ($player->media()->get()->count()) $player->media()->first()->delete();
          if($player->delete()){
              $res['status'] = 202;
              $res['message'] = 'resource deleted successfully';
          }else{
              $res['status'] = 401;
          }
      }
      return response()->json( $res ,$res['status']);

  }
}
