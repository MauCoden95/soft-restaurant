<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', 
        ['except' => [
                'login',
                'register'
             ]
        ]);
    }


    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email',
            'password' => 'required|min:8|max:16'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario registrado con exito',
            'user' => $user,
            'token' => $token
        ]);
    }


    public function login(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->only('email','password');

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login fallido'
            ]);
        }

        $user = User::where('email', $request->email)->first();

        return response()->json([
            'status' => 'success',
            'message' => 'Login exitoso!!!',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function list(){
        $users = User::all();

        return response()->json([
            'users' => $users
        ]);
    }
}
