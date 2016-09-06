<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function(Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('municipality_id')
                ->unsigned();
            $table->string('title');
            $table->text('description')
                ->nullable();
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->boolean('is_lapsed');
            $table->timestamps();

            $table->foreign('municipality_id')
                ->references('id')
                ->on('municipalities')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
