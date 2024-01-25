<?php

namespace App\Http\Controllers\Apis;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\UserCategorySubcategory;

class UserController extends Controller
{
    public function getAllUsers()
    {
        try {
            $users = User::where('user_type', 'USER')->get();
            return ApiResponse::success(['users' => $users], 'Users retrieved successfully');
        } catch (\Exception $e) {
            Log::error('Error retrieving users: ' . $e->getMessage());
            return ApiResponse::error('Error retrieving users', 500, ['exception' => $e->getMessage()]);
        }
    }

    public function getUserById($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return ApiResponse::error('User not found', 404);
            }

            return ApiResponse::success(['user' => $user], 'User retrieved successfully');
        } catch (\Exception $e) {
            Log::error('Error retrieving user by ID ' . $id . ': ' . $e->getMessage());
            return ApiResponse::error('Error retrieving user', 500, ['exception' => $e->getMessage()]);
        }
    }

    public function getUserWithCategorySubcategory($userId)
    {
        $subcategories = UserCategorySubcategory::where('user_id', $userId)
            ->pluck('subcategory_id');
        $category_id = UserCategorySubcategory::where('user_id', $userId)->pluck('category_id')->first();
        $category = Category::find($category_id);
        $user = User::find($userId);

        $data = [
            'user' => $user,
            'subcategyIds' => $subcategories,
            'category' => $category,
        ];
        return ApiResponse::success(['userDetails' => $data], 'User retrieved successfully');
    }
    public function updateUserrWithCategorySubcategory(Request $request, $userId)
    {
        $category_id = $request->category_id;
        $subcategory_ids =  $request->subcategories;

        try {
            DB::beginTransaction();
            UserCategorySubcategory::where('user_id', $userId)->delete();
            foreach ($subcategory_ids as $subcategoryId) {
                UserCategorySubcategory::create([
                    'user_id' => $userId,
                    'category_id' => $category_id,
                    'subcategory_id' => $subcategoryId,
                ]);
            }

            DB::commit();

            return ApiResponse::success('User updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Failed to update user', '', $e->getMessage());
        }

        return ApiResponse::success('User updated successfully');
    }
}
