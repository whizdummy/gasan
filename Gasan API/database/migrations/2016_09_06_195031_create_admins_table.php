<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function(Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('first_name');
            $table->string('middle_name')
                ->nullable();
            $table->string('last_name');
            $table->string('username')
                ->unique();
            $table->string('password');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(array(
                'first_name',
                'middle_name',
                'last_name'
            ), 'uq_admins_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
