<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::get('/', function(){
    return "Welcome to GlobusCup_API v" . ENV('APP_VERSION', "1");
});

Route::group(['prefix'=>'api' , 'middleware' => ['web']] , function () {
    Route::resource('/news'        , 'NewsCtrl');
    Route::resource('/prize'       , 'PrizeCtrl');
    Route::resource('/user'        , 'UserCtrl');
    Route::resource('/round'       , 'RoundCtrl');
    Route::resource('/team'        , 'TeamCtrl');
    Route::resource('/player'      , 'PlayerCtrl');
    Route::resource('/day'         , 'DayCtrl');
    Route::resource('/match'       , 'MatchCtrl');
    Route::resource('/attendance'  , 'AttendanceCtrl');
    Route::resource('/score'       , 'ScoreCtrl');
    Route::resource('/season'      , 'SeasonCtrl');
    Route::resource('/media'       , 'MediaCtrl');
    Route::post('/video'           , 'MediaCtrl@StoreVideo');

});
Route::post('/api/auth', 'AuthCtrl@authenticate');

Route::get('/api/auth/check', ['middleware' => 'jwt.auth', function () {
    return response()->json([ "auth"=>true ], 200);
}]);

Route::get('/socialbot/news/{id}', function($id){
   return "OK";
});

