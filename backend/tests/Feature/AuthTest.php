<?

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_and_login_flow()
    {
        // Registro
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);

        // Login con credenciales correctas
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password'
        ]);
        $response->assertStatus(200)->assertJsonFragment(['message' => 'Login exitoso']);
        $this->assertNotNull(auth()->user()); // Usuario está autenticado en la sesión

        // Logout
        $response = $this->postJson('/api/logout');
        $response->assertStatus(200)->assertJson(['message' => 'Logout exitoso']);
    }

    public function test_product_endpoints_access_control()
    {
        $product = \App\Models\Producto::factory()->create();
        // Invitado puede ver listado y detalle
        $this->getJson('/api/productos')->assertStatus(200);
        $this->getJson('/api/productos/' . $product->id)->assertStatus(200);

        // Invitado no puede crear producto
        $this->postJson('/api/productos', [
            'nombre' => 'X Producto',
            'precio' => 9.99
        ])->assertStatus(401);

        // Usuario normal autenticado tampoco puede crear (role middleware -> 403)
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user)->postJson('/api/productos', [
            'nombre' => 'Y Producto',
            'precio' => 19.99
        ])->assertStatus(403);

        // Admin puede crear
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin)->postJson('/api/productos', [
            'nombre' => 'Z Producto',
            'precio' => 29.99
        ])->assertStatus(201);
    }


    public function test_order_creation_and_listing()
    {
        $user = User::factory()->create(['role' => 'user']);
        $product1 = \App\Models\Producto::factory()->create(['precio' => 10]);
        $product2 = \App\Models\Producto::factory()->create(['precio' => 5]);
        // Usuario debe autenticarse para crear pedido
        $this->postJson('/api/orders', [
            'items' => [
                ['producto_id' => $product1->id, 'cantidad' => 1]
            ]
        ])->assertStatus(401);
        // Autenticado puede crear pedido
        $response = $this->actingAs($user)->postJson('/api/orders', [
            'items' => [
                ['producto_id' => $product1->id, 'cantidad' => 2],
                ['producto_id' => $product2->id, 'cantidad' => 1]
            ]
        ]);
        $response->assertStatus(201)->assertJsonFragment(['message' => 'Pedido creado']);
        $orderId = $response->json('order.id');
        // Verificar que se crearon los OrderItems en la base de datos
        $this->assertDatabaseHas('order_items', ['order_id' => $orderId, 'producto_id' => $product1->id]);
        // Usuario puede ver sus pedidos, y contiene el pedido recién creado
        $this->actingAs($user)->getJson('/api/orders')
            ->assertStatus(200)
            ->assertJsonFragment(['id' => $orderId]);
        // Admin puede ver todos los pedidos
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin)->getJson('/api/admin/orders')
            ->assertStatus(200)
            ->assertJsonFragment(['id' => $orderId, 'user_id' => $user->id]);
    }
}
