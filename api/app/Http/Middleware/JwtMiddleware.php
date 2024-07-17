<?php

namespace App\Http\Middleware;

use App\Services\ResponseService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            // Unauthorized, token not found
            return ResponseService::error('Non autorisé, token introuvable', 401);
        }

        try {
            $user = JWTAuth::setToken($token)->toUser();

            if ($user->status != 'ACTIVE') {
                return ResponseService::error('Unauthorized, user not active', 403);
            }
        } catch (\Exception $e) {
            // dd($e);
            return ResponseService::error('INVALID_TOKEN', 403);
        }

        return $next($request);
    }
}
