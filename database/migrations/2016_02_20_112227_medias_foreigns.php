<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MediasForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('medias', function (Blueprint $table) {
            $table->integer('season_id')->unsigned()->nullable();
            $table->integer('round_id')->unsigned()->nullable(); // >> club photo
            $table->integer('team_id')->unsigned()->nullable();
            // $table->integer('news_id')->unsigned()->nullable();
            $table->integer('player_id')->unsigned()->nullable();

            $table->foreign('season_id')
                  ->references('id')
                  ->on('seasons')
                  ->onDelete('cascade');


            $table->foreign('team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade');

            $table->foreign('round_id')
                ->references('id')
                ->on('rounds')
                ->onDelete('cascade');

            // $table->foreign('news_id')
            //     ->references('id')
            //     ->on('news')
            //     ->onDelete('cascade');

            $table->foreign('player_id')
                ->references('id')
                ->on('players')
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
        Schema::table('medias', function (Blueprint $table) {
            $table->dropForeign('medias_season_id_foreign');
            $table->dropForeign('medias_team_id_foreign');
            //$table->dropForeign('medias_news_id_foreign');
            $table->dropForeign('medias_player_id_foreign');
        });
    }
}
