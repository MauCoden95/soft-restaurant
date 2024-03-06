<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SaleRequest;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;


class SaleController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('jwt.auth');
    // }
    
    
   /**
 * Crear una nueva venta
 *
 * @OA\Post(
 *     path="/api/sale",
 *     tags={"Ventas"},
 *     summary="Crear una nueva venta",
 *     description="Crea una nueva venta en el sistema.",
 *     @OA\RequestBody(
 *         required=true,
 *         description="Datos de la nueva venta",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="total",
 *                 type="number",
 *                 format="float",
 *                 example="100.50"
 *             ),
 *             @OA\Property(
 *                 property="date",
 *                 type="string",
 *                 format="date",
 *                 example="2024-03-04"
 *             ),
 *             @OA\Property(
 *                 property="hour",
 *                 type="string",
 *                 format="time",
 *                 example="12:30:00"
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
 *                 example="Venta guardada!!!"
 *             )
 *         )
 *     )
 * )
 */
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





    /**
 * Obtener las ventas de los últimos cinco días
 *
 * @OA\Get(
 *     path="/api/sales-week",
 *     tags={"Ventas"},
 *     summary="Obtener las ventas de los últimos cinco días",
 *     description="Recupera las ventas totales realizadas en los últimos cinco días.",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="salesLastWeek",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="date",
 *                         type="string",
 *                         format="date",
 *                         example="2024-03-01"
 *                     ),
 *                     @OA\Property(
 *                         property="total_sales",
 *                         type="number",
 *                         format="float",
 *                         example="500.25"
 *                     )
 *                 )
 *             )
 *         )
 *     )
 * )
 */
    public function getSalesLastFiveDays()
    {   
        $dateLastWeek = Carbon::now()->subDays(5);

        
        $salesLastWeek = Sale::selectRaw('DATE(date) as date, SUM(total) as total_sales')
            ->where('date', '>=', $dateLastWeek)
            ->groupBy('date')
            ->get();

        return $salesLastWeek;
    }



    /**
 * Obtener las ventas de las últimas cuatro semanas
 *
 * @OA\Get(
 *     path="/api/sales-four-weeks",
 *     tags={"Ventas"},
 *     summary="Obtener las ventas de las últimas cuatro semanas",
 *     description="Recupera las ventas totales realizadas en las últimas cuatro semanas.",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="salesFourLastWeeks",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="year",
 *                         type="integer",
 *                         example="2024"
 *                     ),
 *                     @OA\Property(
 *                         property="week",
 *                         type="integer",
 *                         example="9"
 *                     ),
 *                     @OA\Property(
 *                         property="total_sales",
 *                         type="number",
 *                         format="float",
 *                         example="1500.75"
 *                     )
 *                 )
 *             )
 *         )
 *     )
 * )
 */
    public function getSalesLastFourWeeks()
    {    
        $dateFourLastWeek = Carbon::now()->subWeeks(4);

        
        $salesfourLastWeek = Sale::selectRaw('YEAR(date) as year, WEEK(date) as week, SUM(total) as total_sales')
            ->where('date', '>=', $dateFourLastWeek)
            ->groupBy('year', 'week')
            ->get();

        return $salesfourLastWeek;
    }





    /**
 * Obtener las ventas de hoy
 *
 * @OA\Get(
 *     path="/api/sales-today",
 *     tags={"Ventas"},
 *     summary="Obtener las ventas de hoy",
 *     description="Recupera todas las ventas realizadas en el día de hoy.",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="salesToday",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object"
 *                 )
 *             )
 *         )
 *     )
 * )
 */
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
   




    /**
 * Obtener las ventas de los últimos doce meses
 *
 * @OA\Get(
 *     path="/api/sales-twelve-weeks",
 *     tags={"Ventas"},
 *     summary="Obtener las ventas de los últimos doce meses",
 *     description="Recupera las ventas totales realizadas en los últimos doce meses.",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="salesLastTwelveMonths",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="year",
 *                         type="integer",
 *                         example="2023"
 *                     ),
 *                     @OA\Property(
 *                         property="month",
 *                         type="integer",
 *                         example="3"
 *                     ),
 *                     @OA\Property(
 *                         property="total_sales",
 *                         type="number",
 *                         format="float",
 *                         example="7500.99"
 *                     )
 *                 )
 *             )
 *         )
 *     )
 * )
 */
    public function getSalesLastTwelveMonths()
    {   
        $dateLastTwelveMonths = Carbon::now()->subMonths(12);

        $salesLastTwelveMonths = Sale::selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(total) as total_sales')
            ->where('date', '>=', $dateLastTwelveMonths)
            ->groupBy('year', 'month')
            ->get();
    
        return $salesLastTwelveMonths;
    }






    /**
 * Obtener la cantidad de ventas por día en los últimos 7 días
 *
 * @OA\Get(
 *     path="/api/sales-for-days",
 *     tags={"Ventas"},
 *     summary="Obtener las ventas por día de los últimos 7 días",
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="salesLastTwelveMonths",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="date",
 *                         type="date",
 *                         example="2024-02-29"
 *                     ),
 *                     @OA\Property(
 *                         property="quantity_sales",
 *                         type="number",
 *                         example="3"
 *                     )
 *                 )
 *             )
 *         )
 *     )
 * )
 */
    public function salesForDays()
    {
        $salesForDay = Sale::select(
                DB::raw('DATE(date) as date'),
                DB::raw('COUNT(*) as quantity_sales')
            )
            ->where('date', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return $salesForDay;
    }

}
