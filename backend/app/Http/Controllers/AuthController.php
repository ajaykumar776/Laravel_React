<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Apis\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ($token = JWTAuth::attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'user_type' => $request->user_type ?? "USER",
                'password' => bcrypt($request->input('password')),
            ]);

            return ApiResponse::success($user, 'User registered successfully');
        } catch (\Exception $e) {
            Log::error('Exception:', ['message' => $e->getMessage()]);
            return ApiResponse::error('Error While Create User');
        }
    }
    public function getProfile()
    {
        $user =  auth()->user();
        return ApiResponse::success($user, 'User Fetch successfully');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        return response()->json(auth()->user());
    }
    public function updateProfile(Request $request)
    {
        try {

            Log::info('Received Request:', ['payload' => $request->all()]);
            $user = Auth::user();

            // Validate request data
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
            ]);

            if ($validator->fails()) {
                return ApiResponse::error('Error While Create User', 422, $validator->errors());
            }
            $newName = $request->input('name');
            if ($request->has('name')) {
                Log::info('New Name from Request: ' . $newName);
                $user->name = $newName;
            }

            if ($request->profile_image) {
                $image = $request->file('profile_image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('profile_image'), $imageName); // Move the image to a public directory
                $user->profile_image = $imageName;
            }

            if ($user->save()) {
                return ApiResponse::success($user, 'Profile updated successfully');
            } else {
                // Log failure
                Log::error('Failed to update profile', ['user_id' => $user->id]);
                return ApiResponse::error('Failed to update profile', 500, $validator->errors());
            }
        } catch (\Exception $e) {
            Log::error('Exception during profile update', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = Auth::user(); // Get the authenticated user

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60 * 24,
        ]);
    }
}
