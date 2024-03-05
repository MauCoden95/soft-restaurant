<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


/**
* @OA\Info(
*             title="API Sistema de Restaurantes", 
*             version="1.0",
*             description="Listado de endpoints de la api"
* )
*
* @OA\Server(url="http://127.0.0.1:8000/")
*/




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



    /**
     * Crear un usuario nuevo
     * @OA\Post (
     *     path="/api/register",
     *     tags={"Users"},
     * description="Crear un nuevo usuario en la base de datos.",
     * @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="name",
 *                     type="string",
 *                     example="Mauro Miguel"
 *                 ),
 *                 @OA\Property(
 *                     property="role_id",
 *                     type="int",
 *                     example="1"
 *                 ),
 *                 @OA\Property(
 *                     property="email",
 *                     type="string",
 *                     example="mauro@email.com"
 *                 ),
 *  
 *                 @OA\Property(
 *                     property="password",
 *                     type="string",
 *                     example="1111111"
 *                 ),
 *             )
 *         )
 *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 type="array",
     *                 property="rows",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="status",
     *                         type="string",
     *                         example="success"
     *                     ),
     *                     @OA\Property(
     *                         property="message",
     *                         type="string",
     *                         example="Usuario registrado con exito!!!"
     *                     ),
     *                     @OA\Property(
     *                         property="user",
     *                         type="json",
                               example="{""name"": ""Mauro Miguel"", ""role_id"": 1, ""email"": ""mauro@email.com"", ""password"": ""11111111""}"
     *                     ),
     *                     @OA\Property(
     *                         property="token",
     *                         type="string",
     *                         example="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM0ODc1MywiaWF0IjoxNzA5MzQ4NzUzfQ.gRkdp6ZyRt60q5eQHgZXBUpC41Byy_ZnHsBUJ4dEKAw"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
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




    /**
     * Iniciar sesión
     * @OA\Post (
     *     path="/api/login",
     *     tags={"Users"},
     * description="Inicio de sesión con usuario y contraseña.",
        * @OA\RequestBody(
    *         required=true,
    *         description="Credenciales de inicio de sesión",
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="email",
    *                     type="string",
    *                     example="mauro@email.com"
    *                 ),
    *                 @OA\Property(
    *                     property="password",
    *                     type="string",
    *                     example="11111111"
    *                 ),
    *             )
    *         )
    *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 type="array",
     *                 property="rows",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="status",
     *                         type="string",
     *                         example="success"
     *                     ),
     *                     @OA\Property(
     *                         property="message",
     *                         type="string",
     *                         example="Login exitoso!!!"
     *                     ),
     *                     @OA\Property(
     *                         property="user",
     *                         type="json",
                               example="{""name"": ""Mauro Miguel"", ""role_id"": 1, ""email"": ""mauro@email.com"", ""password"": ""11111111""}"
     *                     ),
     *                     @OA\Property(
     *                         property="token",
     *                         type="string",
     *                         example="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM0ODc1MywiaWF0IjoxNzA5MzQ4NzUzfQ.gRkdp6ZyRt60q5eQHgZXBUpC41Byy_ZnHsBUJ4dEKAw"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
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




    /**
     * Listar todos los usuarios
     * @OA\Get (
     *     path="/api/users",
     *     tags={"Users"},
     * description="Recupera una lista de todos los usuarios.",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 type="array",
     *                 property="rows",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="number",
     *                         example="1"
     *                     ),
     *                     @OA\Property(
     *                         property="role_id",
     *                         type="int",
     *                         example="2"
     *                     ),
     *                     @OA\Property(
     *                         property="name",
     *                         type="string",
     *                         example="Mauro Miguel"
     *                     ),
     *                     @OA\Property(
     *                         property="email",
     *                         type="string",
     *                         example="mauro@email.com"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function list(){
        $users = User::with('role')->get();

        return response()->json([
            'users' => $users
        ]);
    }






     /**
     * Contar la cantidad de usuarios
     * @OA\Get (
     *     path="/api/users-count",
     *     tags={"Users"},
     * description="Devuelve la cantidad de usuarios.",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 type="array",
     *                 property="rows",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="usersCount",
     *                         type="number",
     *                         example="5"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function usersCount(){
        $users = User::all();
        $usersCount = count($users);

        return response()->json([
            'usersCount' => $usersCount
        ]);
    }






    /**
 * Obtener id de un usuario
 * @OA\Get(
 *     path="/api/user/{id}",
 *     tags={"Users"},
 *     summary="Obtener el id de un usuario por su ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID del usuario",
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 type="array",
     *                 property="rows",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="status",
     *                         type="string",
     *                         example="success"
     *                     ),
     *                     @OA\Property(
     *                         property="message",
     *                         type="string",
     *                         example="Login exitoso!!!"
     *                     ),
     *                     @OA\Property(
     *                         property="user",
     *                         type="json",
                               example="{""name"": ""Mauro Miguel"", ""role_id"": 1, ""email"": ""mauro@email.com"", ""password"": ""11111111""}"
     *                     ),
     *                     @OA\Property(
     *                         property="token",
     *                         type="string",
     *                         example="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM0ODc1MywiaWF0IjoxNzA5MzQ4NzUzfQ.gRkdp6ZyRt60q5eQHgZXBUpC41Byy_ZnHsBUJ4dEKAw"
     *                     )
     *                 )
     *             )
     *         )
     *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Usuario no encontrado"
 *     )
 * )
 */

    public function dataUser($id){
        $id = User::where('id', $id)->value('id');

        return response()->json([
            'id' => $id
        ]);
    }

    
    
    

    /**
 * Actualizar datos usuario
 * @OA\put(
 *     path="/api/user/{id}",
 *     tags={"Users"},
 *     summary="Editar usuario de un ID determinado",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID del usuario",
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 * @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="role_id",
 *                     type="int",
 *                     example=2
 *                 ),
 *                 @OA\Property(
 *                     property="name",
 *                     type="string",
 *                     example="Mauro Miguel"
 *                 ),
 *                 @OA\Property(
 *                     property="email",
 *                     type="string",
 *                     example="mauro@email.com"
 *                 ),
 *  
 *                 @OA\Property(
 *                     property="password",
 *                     type="string",
 *                     example="1111111"
 *                 ),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Usuario editado",
 *         
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Usuario no encontrado"
 *     )
 * )
 */
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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**
 * Cambiar contraseña
 * @OA\put(
 *     path="/api/user-pwd/{id}",
 *     tags={"Users"},
 *     summary="Editar contraseña de un usuario con ID determinado",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID del usuario",
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 * @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(  
 *                 @OA\Property(
 *                     property="password",
 *                     type="string",
 *                     example="1111111"
 *                 ),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Contruseña cambiada",
 *         
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Usuario no encontrado"
 *     )
 * )
 */
    public function changePassword(Request $request ,$id){
        $user = User::find($id);

        $user->update([
            'password' => $request->password
        ]);    
        

        return response()->json("Contraseña cambiada");
    }











    /**
 * Eliminar usuario
 * @OA\delete(
 *     path="/api/user/{id}",
 *     tags={"Users"},
 *     summary="Eliminar usuario con un ID determinado",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID del usuario",
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="Usuario eliminado",
 *         
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Usuario no encontrado"
 *     )
 * )
 */
public function destroy($id){
    $user = User::find($id);

    $user->delete();

    return response()->json("Usuario eliminado");
}

}
