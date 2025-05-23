<?

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Psr\Http\Message\ServerRequestInterface;
use Tqdev\PhpCrudApi\Api;
use Tqdev\PhpCrudApi\Config\Config;

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