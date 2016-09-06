<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminLoginController extends Controller
{
    function login(Request $request)
    {
    	return response()->json(array(
    		'message'	=> 'Wahahahaha'
    	));
    }
}
