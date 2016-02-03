<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatchs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matchs', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('season_id')->unsigned();
            $table->integer('team_a_id')->unsigned();
            $table->integer('team_b_id')->unsigned();
            $table->integer('winner_id')->unsigned()->nullable(); // count() victories if null is a draw
            $table->integer('day_id')->unsigned();
            
            $table->foreign('day_id')
                  ->references('id')
                  ->on('days');


            $table->foreign('winner_id')
                  ->references('id')
                  ->on('teams');
            
            $table->foreign('team_a_id')
                  ->references('id')
                  ->on('teams');

            $table->foreign('team_b_id')
                  ->references('id')
                  ->on('teams');

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
        Schema::drop('matchs');
    }
}
