<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    
    protected $table = 'productos';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'categoria_id',
    ];

    // Relación uno a muchos con la tabla order_items
    // Un producto puede estar en muchos pedidos
    public function orderItems()
    {
        return $this->hasManu(OrderItem::class);
    }
}
