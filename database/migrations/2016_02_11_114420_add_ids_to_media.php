<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIdsToMedia extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
      Schema::table('medias', function (Blueprint $table) {
          $table->integer('team_id')->unsigned()->nullable();
          $table->integer('news_id')->unsigned()->nullable();

          $table->foreign('team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade');

          $table->foreign('news_id')
                ->references('id')
                ->on('news')
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
          $table->dropColumn('team_id');
          $table->dropColumn('news_id');
      });
  }
}
