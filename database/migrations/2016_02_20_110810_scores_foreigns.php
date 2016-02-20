<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ScoresForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->integer('team_id')->unsigned(); 
            $table->integer('player_id')->unsigned(); 
            $table->integer('match_id')->unsigned();
            $table->integer('season_id')->unsigned();

            $table->foreign('team_id')
                  ->references('id')
                  ->on('teams')
                  ->onDelete('cascade');

            $table->foreign('player_id')
                  ->references('id')
                  ->on('players')
                  ->onDelete('cascade');

            $table->foreign('match_id')
                  ->references('id')
                  ->on('matchs')
                  ->onDelete('cascade');

            $table->foreign('season_id')
                  ->references('id')
                  ->on('seasons')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->dropForeign('scores_team_id_foreign');
            $table->dropForeign('scores_player_id_foreign');
            $table->dropForeign('scores_match_id_foreign');
            $table->dropForeign('scores_season_id_foreign');
        });
    }
}
