<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MunicipalityHistory extends Model
{
    protected $fillable = array(
    	'municipality_id'
    	'year',
    	'description',
    	'image_path',
    );
}
