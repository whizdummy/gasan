<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')
    	->insert(array(
    		'first_name'	=> 'Jerald John',
    		'middle_name'	=> 'Rifareal',
    		'last_name'		=> 'Pormon',
    		'username'		=> 'ADMIN00001',
    		'password'		=> bcrypt('admin12345'),
    		'created_at'	=> Carbon::now(),
    		'updated_at'	=> Carbon::now()
    	));

       DB::table('municipality_admins')
       	->insert(array(
       		'admin_id'			=> 1,
       		'municipality_id'	=> 1,
       		'created_at'		=> Carbon::now(),
       		'updated_at'		=> Carbon::now()
       	));
    }
}
