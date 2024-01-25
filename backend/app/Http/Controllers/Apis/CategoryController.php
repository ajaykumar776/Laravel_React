<?php

namespace App\Http\Controllers\Apis;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Apis\ApiResponse;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function getAllCategories()
    {
        try {
            $categories = Category::with('subcategories')->get();
            return ApiResponse::success($categories, 'Categories retrieved successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Error retrieving categories');
        }
    }

    public function createCategory(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|unique:categories,name',
            ]);

            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                return ApiResponse::error('Validation error', 422, $errors);
            }
            $data = ['name' => $request->name];
            $category = Category::create($data);
            return ApiResponse::success($category, 'Category created successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Error creating category', $e->getMessage());
        }
    }

    public function updateCategory(Request $request, $categoryId)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|unique:categories,name,' . $categoryId,
            ]);

            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                return ApiResponse::error('Validation error', 422, $errors);
            }
            $category = Category::find($categoryId);
            if (!$category) {
                return ApiResponse::error('Category not found Which You want to Update', 404);
            }
            $category = Category::findOrFail($categoryId);
            $data = ['name' => $request->name];
            $category->update($data);

            return ApiResponse::success($category, 'Category updated successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Error updating category');
        }
    }
    public function EditCategory(Request $request, $categoryId)
    {
        try {

            $category = Category::find($categoryId);
            if (!$category) {
                return ApiResponse::error('Category not found Which You want to Update', 404);
            }
            $category = Category::findOrFail($categoryId);
            return ApiResponse::success($category, 'Category get successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Error updating category');
        }
    }

    public function deleteCategory($categoryId)
    {
        try {

            $category = Category::find($categoryId);
            if (!$category) {
                return ApiResponse::error('Category not found', 404);
            }
            $category = Category::findOrFail($categoryId);
            $category->delete();

            return ApiResponse::success(null, 'Category deleted successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Error deleting category');
        }
    }
}
