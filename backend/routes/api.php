<?

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\FavoriteController;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Psr\Http\Message\ServerRequestInterface;
use Tqdev\PhpCrudApi\Api;
use Tqdev\PhpCrudApi\Config\Config;
use Illuminate\Http\Request;

Route::prefix('v1')->group(function () {
    Route::apiResource('productos', ProductoController::class);
    Route::get('{tabla}/count', function ($tabla) {
        return response()->json([
            'count' => DB::table($tabla)->count()
        ], 200);
    });
    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/test', function(){
        return 'OK';
    });

    // Rutas de autenticación
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

    // Rutas protegidas para pedidos
    Route::middleware(['auth:sanctum', 'role:user,admin'])->group(function () {
        // Solo usuarios autenticados pueden crear pedidos y ver los suyos
        Route::post('/orders', [OrderController::class, 'store']);
        Route::get('/orders', [OrderController::class, 'index']);
    });
    // Solo admin puede ver todos los pedidos
    Route::middleware(['auth:sanctum', 'role:admin'])->get('/orders/all', [OrderController::class, 'indexAll']);

    // Rutas protegidas de favoritos
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites', [FavoriteController::class, 'store']);
        Route::delete('/favorites/{product_id}', [FavoriteController::class, 'destroy']);
    });

    // Para comprobar si un email ya existe
    Route::get('/user-exists', function (Request $request) {
        $exists = User::where('email', $request->query('email'))->exists();
        return response()->json(['exists' => $exists]);
    });
});

Route::any('/{any}', function (ServerRequestInterface $request) {
    $config = new Config([
        'address' => env('DB_HOST', '127.0.0.1'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'basePath' => '/api',
    ]);
    $api = new Api($config);
    $response = $api->handle($request);

    try {
        $records = json_decode($response->getBody()->getContents())->records;
        $response = response()->json($records, 200, $headers = ['X-Total-Count' => count($records)]);
    } catch (\Throwable $th) {
    }
    return $response;
})->where('any', '.*');