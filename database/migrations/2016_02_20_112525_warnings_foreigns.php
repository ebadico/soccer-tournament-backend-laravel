<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WarningsForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('warnings', function (Blueprint $table) {

            $table->integer('match_id')->unsigned()->nullable();
            $table->integer('player_id')->unsigned()->nullable();

            $table->foreign('match_id')
                  ->references('id')
                  ->on('matchs')
                  ->onDelete('cascade');

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
        Schema::table('warnings', function (Blueprint $table) {
            $table->dropForeign('warnings_match_id_foreign');
            $table->dropForeign('warnings_player_id_foreign');
        });
    }
}
