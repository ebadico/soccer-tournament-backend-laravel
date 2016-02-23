<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFeaturedImageToNews extends Migration{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up(){
      Schema::table('news', function (Blueprint $table) {
        $table->integer('featured_id')->unsigned()->nullable();
        $table->foreign('featured_id')
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
      Schema::table('news', function (Blueprint $table) {
        $table->dropForeign('news_featured_id_foreign');
      });
  }
}