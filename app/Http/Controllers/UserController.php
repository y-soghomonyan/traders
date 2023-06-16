<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class UserController extends Controller
{
    //

    public $user;

    public function __construct(){

    //   $this->user = Auth::user();

    }

    public function get_user(){

        if(!empty(Auth::user())){
            return response()->json(['user' => Auth::user()]);
        }
        return response()->json(['error' => 'user not found']);
    }

    public function profile(){

        return view('user.profile.profile');
        
    }
}
