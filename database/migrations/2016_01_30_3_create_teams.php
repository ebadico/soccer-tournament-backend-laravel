<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeams extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            
            $table->integer('wins')->unsigned()->default(0);
            $table->integer('draws')->unsigned()->default(0);
            $table->integer('losts')->unsigned()->default(0);

            $table->integer('round_id')->unsigned();
            $table->foreign('round_id')
                  ->references('id')
                  ->on('rounds');
            
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
        Schema::drop('teams');
    }
}
