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

    public function dishesQuantity(){
        $dishes = Dish::all();
        $dishesCount = count($dishes);

        return response()->json([
            'dishesCount' => $dishesCount
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
   

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(Dish $dish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dish $dish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $dish = Dish::find($id);

        $dish->delete();

        return response()->json("Producto eliminado");
    }

    public function dishById($id){
        $dish = Dish::find($id);

        return response()->json([
            'dish' => $dish
        ]);
    }
}
