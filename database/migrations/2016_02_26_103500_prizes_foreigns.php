<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PrizesForeigns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('prizes', function (Blueprint $table) {
            $table->integer('media_id')->unsigned()->nullable();
            $table->foreign('media_id')
                  ->references('id')
                  ->on('medias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        Schema::table('prizes', function (Blueprint $table) {
            $table->dropForeign('prizes_media_id_foreign');
        });
    }
}
