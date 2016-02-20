<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AttendancesForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->integer('player_id')->unsigned();
            $table->integer('match_id')->unsigned();
            $table->integer('season_id')->unsigned();

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
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign('attendances_player_id_foreign');
            $table->dropForeign('attendances_match_id_foreign');
            $table->dropForeign('attendances_season_id_foreign');
        });
    }
}
