<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MatchsForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('matchs', function (Blueprint $table) {
            $table->integer('season_id')->unsigned();
            $table->integer('team_a_id')->unsigned();
            $table->integer('team_b_id')->unsigned();
            $table->integer('winner_id')->unsigned()->nullable(); // count() victories if null is a draw
            $table->integer('day_id')->unsigned();
            
            $table->foreign('day_id')
                  ->references('id')
                  ->on('days')
                  ->onDelete('cascade');


            $table->foreign('winner_id')
                  ->references('id')
                  ->on('teams');
            
            $table->foreign('team_a_id')
                  ->references('id')
                  ->on('teams')
                  ->onDelete('cascade');

            $table->foreign('team_b_id')
                  ->references('id')
                  ->on('teams')
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
        Schema::table('matchs', function (Blueprint $table) {
            $table->dropForeign('matchs_season_id_foreign');
            $table->dropForeign('matchs_team_a_id_foreign');
            $table->dropForeign('matchs_team_b_id_foreign');
            $table->dropForeign('matchs_winner_id_foreign');
            $table->dropForeign('matchs_day_id_foreign');
        });
    }
}
