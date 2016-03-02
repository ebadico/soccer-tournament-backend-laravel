<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MatchAddPlayedCol extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
      Schema::table('matchs', function (Blueprint $table) {
        $table->boolean('played')->default(false);
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
      Schema::table('matchs', function (Blueprint $table) {
        $table->dropColumn('played');
      });
  }
}
