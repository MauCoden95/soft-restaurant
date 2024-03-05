<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct()
    
      {   $this->middleware('jwt.auth');
    }



    /**
 * Listar todos los roles
 *
 * @OA\Get(
 *     path="/api/roles",
 *     tags={"Roles"},
 *     summary="Listar todos los roles",
 *     description="Recupera una lista de todos los roles disponibles.",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="roles",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="id",
 *                         type="integer",
 *                         example="1"
 *                     ),
 *                     @OA\Property(
 *                         property="name",
 *                         type="string",
 *                         example="Admin"
 *                     )
 *                 )
 *             )
 *         )
 *     )
 * )
 */
    public function index()
    {
        $roles = Role::all();
        
        return response()->json([
            'roles' => $roles
        ]);
    }

   
}
