<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
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
        

        $user = User::create([
            'name' => $request->name,
            'role_id' => $request->role_id,
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
        $users = User::with('role')->get();

        return response()->json([
            'users' => $users
        ]);
    }

    public function usersCount(){
        $users = User::all();
        $usersCount = count($users);

        return response()->json([
            'usersCount' => $usersCount
        ]);
    }

    public function dataUser($id){
        $id = User::where('id', $id)->value('id');

        return response()->json([
            'id' => $id
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $user->update([
            'role_id' => $request->role_id,
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);    
        

        return response()->json("Usuario editado");
    }
}
