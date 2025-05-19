<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;


class ProductosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Producto::truncate();
        if (config('app.env') === 'local') {
            Producto::factory(10)->create();
        }
    }
}
