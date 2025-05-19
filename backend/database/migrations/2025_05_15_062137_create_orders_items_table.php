<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**  
     *  Esta tabla relaciona los productos con pedidos.
     *  Almacena la cantidad decada producto en el pedido y el precio unitario.
     *  Las claves foraneas tienen `cascade` para eliminar los registros relacionados
     *  al eliminar un pedido o un producto.
     */

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ordersItems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->integer('cantidad');
            $table->decimal('precio', 8, 2);
            // $table->decimal('subtotal', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordersItems');
    }
};
