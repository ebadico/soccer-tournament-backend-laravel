<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('team_id')->unsigned(); 
            $table->foreign('team_id')
                  ->references('id')
                  ->on('teams');

            $table->integer('player_id')->unsigned(); 
            $table->foreign('player_id')
                  ->references('id')
                  ->on('players');

            $table->integer('match_id')->unsigned(); 
            $table->foreign('match_id')
                  ->references('id')
                  ->on('matchs');

            $table->integer('season_id')->unsigned();
            $table->foreign('season_id')
                  ->references('id')
                  ->on('seasons')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('scores');
    }
}
