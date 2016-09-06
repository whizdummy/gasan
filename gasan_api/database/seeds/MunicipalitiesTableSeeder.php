<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class MunicipalitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('municipalities')
        	->insert(array(
        		'name'			=> 'Gasan',
        		'mission'		=> 'Mission Impossible',
        		'vision'		=> 'Vision Possible',
        		'created_at'	=> Carbon::now(),
        		'updated_at'	=> Carbon::now()
        	));
    }
}
