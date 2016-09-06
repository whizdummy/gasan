<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admin extends Model
{
	use SoftDeletes;

	protected $dates = array('deleted_at');

	protected $fillable = array(
		'username',
		'password'
	);
}
