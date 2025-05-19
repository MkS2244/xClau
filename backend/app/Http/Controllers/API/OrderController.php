<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\NewOrderNotification;
use App\Models\Order;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $orders = Order::with('items.productos')->where('user_id', $user->id)->get();
        return response()->json($orders);
    }

    /**
     * List all ordders for admin.
     */
    public function indexAll()
    {
        $orders = Order::with('items.productos')->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate([

            'items' => 'required|array',
            'items.*.producto_id' => 'required|exists:productos,id',
            'items.*.cantidad' => 'required|integer|min:1',
        ]);

        $total = 0;
        $itemsData= $data['items'];

        // Calcular el total del pedido y crear Order
        foreach ($itemsData as $item){

            $product = Producto::find($item['producto_id']);

            if (!$product){

                return response()->json(['error' => 'Producto no encontrado'], 400);
            }
            $total += $product->precio * $item['cantidad'];
        }

        $order = Order::create([

            'user_id' => $user->id,
            'total' => $total,
            'status' => 'pending',
        ]);

        // Crear OrderItems
        foreach ($itemsData as $item) {
            $product = Producto::find($item['producto_id']);

            $order->items()->create([
                'order_id' => $order->id,
                'producto_id' => $product->id,
                'cantidad' => $item['cantidad'],
                'precio' => $product->precio,
            ]);
        }
        
        // Enviar notificación al administrador por email
        Mail::to(config('app.admin_email'))->send(new NewOrderNotification($order));
        return response()->json(['message' => 'Pedido creado', 'order' => $order->load('items.productos')], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
