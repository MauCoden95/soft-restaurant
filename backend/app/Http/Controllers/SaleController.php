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
    
    
   
    public function store(SaleRequest $request)
    {
         $sale = new Sale([
            'total' => $request->total,
            'date' => Carbon::createFromFormat('Y-m-d', $request->date, 'America/Argentina/Buenos_Aires'),
            'hour' => Carbon::createFromFormat('H:i:s', $request->hour, 'America/Argentina/Buenos_Aires')
         ]);

         $sale->save();

         return response()->json("Venta guardada!!!");
    }




    public function getSalesLastFiveDays()
    {   
        $dateLastWeek = Carbon::now()->subDays(5);

        
        $salesLastWeek = Sale::selectRaw('DATE(date) as date, SUM(total) as total_sales')
            ->where('date', '>=', $dateLastWeek)
            ->groupBy('date')
            ->get();

        return $salesLastWeek;
    }


    public function getSalesLastFourWeeks()
    {    
        $dateFourLastWeek = Carbon::now()->subWeeks(4);

        
        $salesfourLastWeek = Sale::selectRaw('YEAR(date) as year, WEEK(date) as week, SUM(total) as total_sales')
            ->where('date', '>=', $dateFourLastWeek)
            ->groupBy('year', 'week')
            ->get();

        return $salesfourLastWeek;
    }



    public function todaySales()
    {
        $currentDate = Carbon::now()->setTimezone('America/Argentina/Buenos_Aires')->toDateString();
        $salesToday = Sale::whereDate('date', $currentDate)->get();
        

        return response()->json([
            'salesToday' => $salesToday
        ]);
    }

    

    public function getSalesLastThreeMonths()
    {   
        $dateLastThreeMonths = Carbon::now()->subMonths(3);

        $salesLastThreeMonths = Sale::selectRaw('DATE(date) as date, SUM(total) as total_sales')
            ->where('date', '>=', $dateLastThreeMonths)
            ->groupBy('date')
            ->get();

        return $salesLastThreeMonths;
    }
}
