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

Route::get('/', function () {
    return view('main');
});

Route::get('/api', function () {
    return "Globus Cup API Version: " . env('APP_VERSION');
});

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

Route::group(['prefix'=>'api/' , 'middleware' => ['web']] , function () {
    Route::resource('/news'        , 'NewsCtrl');
    Route::resource('/media'       , 'MediaCtrl');
    Route::resource('/user'        , 'UserCtrl');
    Route::resource('/round'       , 'RoundCtrl');
    Route::resource('/team'        , 'TeamCtrl');
    Route::resource('/player'      , 'PlayerCtrl');
    Route::resource('/day'         , 'DayCtrl');
    Route::resource('/match'       , 'MatchCtrl');
    Route::resource('/attendance'  , 'AttendanceCtrl');
    Route::resource('/score'       , 'ScoreCtrl');
    Route::resource('/season'      , 'SeasonCtrl');

});

