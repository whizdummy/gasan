<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMunicipalityAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('municipality_admins', function(Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('admin_id')
                ->unsigned();
            $table->integer('municipality_id')
                ->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('admin_id')
                ->references('id')
                ->on('admins')
                ->onUpdate('cascade');

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
        Schema::dropIfExists('municipality_admins');
    }
}
