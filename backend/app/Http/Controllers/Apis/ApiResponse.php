<?php

namespace App\Http\Controllers\Apis;

use Illuminate\Support\Carbon;

class ApiResponse
{
    public static function success($data = [], $message = 'Success', $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'code' => $code,
            'message' => $message,
            'payload' => $data,
        ], $code);
    }

    public static function  error($message = 'Error', $code = 500, $error = [])
    {
        return response()->json([
            'status' => 'error',
            'code' => $code,
            'message' => $message,
            'error' => $error,
        ], $code);
    }
    public static function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y h:i A');
    }
}
