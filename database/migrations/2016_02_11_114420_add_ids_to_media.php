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
          $table->integer('player_id')->unsigned()->nullable();

          $table->foreign('team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade');

          $table->foreign('news_id')
                ->references('id')
                ->on('news')
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
      Schema::table('medias', function (Blueprint $table) {
          $table->dropForeign('player_id');
          $table->dropForeign('team_id');
          $table->dropForeign('news_id');
      });
  }
}
