<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfigurations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('configurations', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->boolean('tournament_active')->default(false);
            $table->string('tornament_name');
            $table->string('admin_email')->default('simonecorsi.rm+globus_cup@gmail.com');
            $table->string('cms_owner')->default('Simone Corsi');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('configurations');
    }
}
