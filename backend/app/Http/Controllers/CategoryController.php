<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
         $this->middleware('jwt.auth');
    }


    public function getIdbyName($name){
        $category = Category::where('name', $name)->first();

        return response()->json([
            'category' => $category
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories
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
    public function store(Request $request)
    {
        $category = new Category([
            'name' => $request->name,
        ]);

        $category->save();

        return response()->json("Categoría guardada");
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        $category->update([
            'name' => $request->name
        ]);    
        

        return response()->json("Categoría editada");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        $category->delete();

        return response()->json("Categoría eliminada");
    }

    public function categoryById($id){
        $category = Category::find($id);

        return response()->json([
            'category' => $category
        ]);
    }
}
