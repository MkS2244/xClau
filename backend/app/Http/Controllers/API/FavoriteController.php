<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Producto;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    // Obtener todos los favoritos del usuario autenticado
    public function index()
    {
        $user = Auth::user();
        $favorites = $user->favorites()->pluck('product_id');
        return response()->json(['favorites' => $favorites]);
    }

    // Añadir un producto a favoritos
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:productos,id',
        ]);
        $user = Auth::user();
        $favorite = Favorite::firstOrCreate([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
        ]);
        return response()->json(['message' => 'Producto añadido a favoritos']);
    }

    // Eliminar un producto de favoritos
    public function destroy($product_id)
    {
        $user = Auth::user();
        $deleted = Favorite::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->delete();
        return response()->json(['message' => 'Producto eliminado de favoritos']);
    }
}
