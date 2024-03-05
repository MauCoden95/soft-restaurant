<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;


class DishController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    /**
     * Display a listing of the resource.
     */


     /**
     * Listar todos los platos
     *
     * @OA\Get(
     *     path="/api/dishes",
     *     tags={"Platos"},
     *     summary="Listar todos los platos",
     *     description="Recupera una lista de todos los platos disponibles.",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="dishes",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="integer",
     *                         example="1"
     *                     ),
     *                     @OA\Property(
     *                         property="category_name",
     *                         type="string",
     *                         example="Categoria"
     *                     ),
     *                     @OA\Property(
     *                         property="name",
     *                         type="string",
     *                         example="Plato"
     *                     ),
     *                     @OA\Property(
     *                         property="description",
     *                         type="string",
     *                         example="Descripción del plato"
     *                     ),
     *                     @OA\Property(
     *                         property="price",
     *                         type="number",
     *                         format="float",
     *                         example="10.50"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $dishes = DB::table('dishes')
        ->join('categories', 'dishes.category_id', '=', 'categories.id')
        ->select('dishes.id', 'categories.name as category_name', 'dishes.name', 'dishes.description', 'dishes.price')
        ->get();

        return response()->json([
            'dishes' => $dishes
        ]);
    }



    /**
 * Obtener la cantidad de platos
 *
 * @OA\Get(
 *     path="/api/dishes-count",
 *     tags={"Platos"},
 *     summary="Obtener la cantidad de platos",
 *     description="Recupera la cantidad total de platos disponibles en el sistema.",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="dishesCount",
 *                 type="integer",
 *                 example="10"
 *             )
 *         )
 *     )
 * )
 */
    public function dishesQuantity(){
        $dishes = Dish::all();
        $dishesCount = count($dishes);

        return response()->json([
            'dishesCount' => $dishesCount
        ]);
    }

 



    /**
 * Crear un nuevo plato
 *
 * @OA\Post(
 *     path="/api/dishes",
 *     tags={"Platos"},
 *     summary="Crear un nuevo plato",
 *     description="Crea un nuevo plato en el sistema.",
 *     @OA\RequestBody(
 *         required=true,
 *         description="Datos del nuevo plato",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="category_id",
 *                 type="integer",
 *                 example="1"
 *             ),
 *             @OA\Property(
 *                 property="name",
 *                 type="string",
 *                 example="Nombre del nuevo plato"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 example="Descripción del nuevo plato"
 *             ),
 *             @OA\Property(
 *                 property="price",
 *                 type="number",
 *                 format="float",
 *                 example="12.99"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="message",
 *                 type="string",
 *                 example="Insumo guardado"
 *             )
 *         )
 *     )
 * )
 */
    public function store(Request $request)
    {
        $dish = new Dish([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price
        ]);

        $dish->save();

        return response()->json("Insumo guardado");
    }

    

    


     /**
     * Actualizar un plato existente
     *
     * @OA\Put(
     *     path="/api/dish/{id}",
     *     tags={"Platos"},
     *     summary="Actualizar un plato existente",
     *     description="Actualiza la información de un plato existente en el sistema.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del plato a actualizar",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos del plato a actualizar",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="category_id",
     *                 type="integer",
     *                 example="1"
     *             ),
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 example="Nuevo nombre del plato"
     *             ),
     *             @OA\Property(
     *                 property="description",
     *                 type="string",
     *                 example="Nueva descripción del plato"
     *             ),
     *             @OA\Property(
     *                 property="price",
     *                 type="number",
     *                 format="float",
     *                 example="15.99"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Insumo editado"
     *             )
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $dish = Dish::find($id);

        $dish->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price
        ]);    
        

        return response()->json("Insumo editado");
    }





    /**
 * Eliminar un plato existente
 *
 * @OA\Delete(
 *     path="/api/dish/{id}",
 *     tags={"Platos"},
 *     summary="Eliminar un plato existente",
 *     description="Elimina un plato existente del sistema.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID del plato a eliminar",
 *         required=true,
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
 *                 property="message",
 *                 type="string",
 *                 example="Producto eliminado"
 *             )
 *         )
 *     )
 * )
 */
    public function destroy($id)
    {
        $dish = Dish::find($id);

        $dish->delete();

        return response()->json("Producto eliminado");
    }



    /**
 * Obtener un plato por su ID
 *
 * @OA\Get(
 *     path="/api/dish/{id}",
 *     tags={"Platos"},
 *     summary="Obtener un plato por su ID",
 *     description="Recupera la información de un plato específico por su ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID del plato a recuperar",
 *         required=true,
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
 *                 property="dish",
 *                 type="object"
 *             )
 *         )
 *     )
 * )
 */
    public function dishById($id){
        $dish = Dish::find($id);

        return response()->json([
            'dish' => $dish
        ]);
    }
}
