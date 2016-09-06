<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOfficialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('officials', function(Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('municipality_id')
                ->unsigned();
            $table->integer('position_id')
                ->unsigned();
            $table->string('first_name');
            $table->string('middle_name')
                ->unique();
            $table->string('last_name');
            $table->date('office_start');
            $table->date('office_end');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(array(
                'first_name',
                'middle_name',
                'last_name'
            ));

            $table->foreign('municipality_id')
                ->references('id')
                ->on('municipalities')
                ->onUpdate('cascade');

            $table->foreign('position_id')
                ->references('id')
                ->on('positions')
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
        Schema::dropIfExists('officials');
    }
}
