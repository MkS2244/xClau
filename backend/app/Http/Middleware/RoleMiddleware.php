<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Usuario autenticado 
        $user = $request->user();
        
        if(!$user){
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Si se especifica un rol y no coincide con el rol del usuario, se rechaza 
        if (!empty($roles) && !in_array($user->role, $roles)){
            return response()->json(['message' => 'Forbidden'], 403);
        }
        
        return $next($request);
    }
}
