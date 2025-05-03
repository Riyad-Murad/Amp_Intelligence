<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureClient
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $user_type = $user?->user_type;

        if ($user_type === "Client") {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthorized: Only clients can access this resource.'
        ], 403);
    }
}
