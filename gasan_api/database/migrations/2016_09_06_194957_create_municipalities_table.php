<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMunicipalitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('municipalities', function(Blueprint $table) {
            $table->engine = "InnoDB";

            $table->increments('id');
            $table->string('name')
                ->unique();
            $table->text('image_path')
                ->nullable();
            $table->string('mission');
            $table->string('vision');
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
        Schema::dropIfExists('municipalities');
    }
}
