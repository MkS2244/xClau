<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
        // Registro de nuevo usuario
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user',  // por defecto, rol usuario normal
        ]);
        // Opcional: autenticamos automáticamente tras registro
        Auth::login($user);
        return response()->json(['message' => 'Usuario registrado exitosamente', 'user' => $user], 201);
    }

    // Login de usuario existente
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
        // Regenerar la sesión para evitar fijación de sesión
        $request->session()->regenerate();
        $user = Auth::user();
        return response()->json(['message' => 'Login exitoso', 'user' => $user]);
    }

    // Logout (cerrar sesión)
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();  // Cerrar sesión del guard web
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout exitoso']);
    }
}
