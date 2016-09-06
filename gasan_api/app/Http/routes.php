<?php

header('Access-Control-Allow-Origin: *');
header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix'	=> 'api'], function () {
	// API v1
	Route::group(['prefix'	=> 'v1'], function() {
		// Admin API
		Route::group(['prefix'	=> 'admins'], function() {
			Route::post('login', 'Api\\AdminLoginController@login');
		});

		// Municipality API
		Route::resource('municipalities', 'Api\\MunicipalityController');
	});
});
