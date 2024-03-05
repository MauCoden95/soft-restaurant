<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function __construct()
    {
         $this->middleware('jwt.auth');
    }


    /**
     * Listar todas las mesas
     * @OA\Get (
     *     path="/api/tables",
     *     tags={"Mesas"},
     * description="Recupera una lista de todas las mesas disponibles.",
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
     *                         property="nro",
     *                         type="int",
     *                         example="2"
     *                     ),
     *                     @OA\Property(
     *                         property="state",
     *                         type="boolean",
     *                         example=false
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $tables = Table::all();

        return response()->json([
            'tables' => $tables
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */



     /**
     * Crear una tabla nueva
     * @OA\Post (
     *     path="/api/table",
     *     tags={"Mesas"},
     * description="Agrega una nueva mesa.",
     * @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="nro",
 *                     type="integer",
 *                     example=15
 *                 )
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
     *                         property="message",
     *                         type="string",
     *                         example="Mesa guardada"
     *                     ),
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $table = new Table([
            'nro' => $request->nro,
        ]);

        $table->save();

        return response()->json("Mesa guardada");
    }



    /**
     * Cambiar disponibilidad de una mesa por su id
     * @OA\Put (
     *     path="/change/{id}",
     *     tags={"Mesas"},
     * description="Cambia el estado de la mesa de false a true o viceversa.",
     * @OA\RequestBody(
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="id",
    *                     type="integer",
    *                     example=15
    *                 )
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
     *                         property="message",
     *                         type="string",
     *                         example="Estado cambiado correctamente"
     *                     ),
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function changeAvailability($id){
        $table = Table::find($id);

        $table->toggleState();
        return response()->json(['message' => 'Estado cambiado correctamente']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Table $table)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Table $table)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Table $table)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Table $table)
    {
        //
    }
}
