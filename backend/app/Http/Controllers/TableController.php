<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TableController extends Controller
{
    // public function __construct()
    // {
    //      $this->middleware('jwt.auth');
    // }

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
    public function store(Request $request)
    {
        $table = new Table([
            'nro' => $request->nro,
        ]);

        $table->save();

        return response()->json("Mesa guardada");
    }

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
