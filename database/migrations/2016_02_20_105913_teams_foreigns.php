<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TeamsForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->integer('round_id')->unsigned();
            $table->foreign('round_id')
                  ->references('id')
                  ->on('rounds')
                  ->onDelete('cascade');
            
            $table->integer('season_id')->unsigned();
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
        Schema::table('teams', function (Blueprint $table) {
            $table->dropForeign('teams_round_id_foreign');
            $table->dropForeign('teams_season_id_foreign');
        });
    }
}
