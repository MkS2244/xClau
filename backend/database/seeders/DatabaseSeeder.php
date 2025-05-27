<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Model::unguard();
        Schema::disableForeignKeyConstraints();

        User::factory(10)->create();
        $this->call(ProductosTableSeeder::class);
        $this->command->info('Tabla productos creada con éxito! :)');
        $this->call(AdminUserSeeder::class);
        $this->command->info('Admin user creado con éxito! :)');

        Model::reguard();
        Schema::enableForeignKeyConstraints();
    }
}
