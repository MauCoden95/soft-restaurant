<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SaleRequest;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;


class SaleController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    
    public function index()
    {
        //
    }

   
    public function store(SaleRequest $request)
    {
         $sale = new Sale([
            'total' => $request->total,
            'date' => $request->date,
            'hour' => $request->hour
         ]);

         $sale->save();

         return response()->json("Venta guardada!!!");
    }

    public function todaySales()
    {
        $currentDate = Carbon::now()->setTimezone('America/Argentina/Buenos_Aires')->toDateString();
        $salesToday = Sale::whereDate('date', $currentDate)->get();
        

        return response()->json([
            'salesToday' => $salesToday
        ]);
    }

    
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
