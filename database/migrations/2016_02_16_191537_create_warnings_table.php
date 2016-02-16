<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarningsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warnings', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

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
        Schema::drop('warnings');
    }
}
