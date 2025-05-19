<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    public $modelclass = Producto::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Producto::all();

        return response()->json($product);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Solo admins deberian poder acceder aqui (el middleware lo controla)
        $productoData = $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'imagen' => 'nullable|image|max:2048', // valido si es una imagen
        ]);

        // Manejar la subida de la imagen

        $filename = null;

        if ($request->hasFile('imagen')) {

            $path = $request->file('imagen')->store('public/productos');
            $filename = basename($path);
        }

        $producto = Producto::create([

            'nombre' => $productoData['nombre'],
            'descripcion' => $productoData['descripcion'] ?? '',
            'precio' => $productoData['precio'],
            'imagen' => $filename,
        ]);

        return response()->json([ 'message' => 'Producto creado correctamente', 'producto' => $producto], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        $producto = Producto::find($producto->id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        $product = Producto::find($producto->id);
        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        $data = $request->validate([
            'nombre' => 'sometimes|string',
            'descripcion' => 'sometimes|string',
            'precio' => 'sometimes|numeric',
            'imagen' => 'sometimes|image|max:2048'
        ]);
        // Si viene nueva imagen, procesarla
        if ($request->hasFile('imagen')) {
            // Borrar imagen anterior si existe
            if ($product->image) {
                Storage::delete('public/products/'.$product->image);
            }
            $path = $request->file('imagen')->store('public/productos');
            $data['imagen'] = basename($path);
        }
        $product->update($data);
        return response()->json(['message' => 'Producto actualizado', 'producto' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        try{
            $producto = Producto::find($producto->id);

            if(!$producto){
                return response()->json(['message' => 'Producto no encontrado'], 404);
            }
            // Borrar imagen si existe
            if($producto->imagen){
                Storage::delete('public/productos/'.$producto->imagen);
            }
            $producto->delete();
            return response()->json(['message' => 'Producto eliminado correctamente']);
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
