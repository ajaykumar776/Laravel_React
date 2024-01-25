<?php

namespace App\Http\Controllers\Apis;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Apis\ApiResponse;
use Illuminate\Support\Facades\Log;

class SubCategoryController extends Controller
{
    public function getAllSubCategories()
    {
        try {

            $subCategories = SubCategory::Select('*')->with('category')->get();
            return ApiResponse::success($subCategories, 'Subcategories retrieved successfully');
        } catch (\Exception $e) {

            Log::error('Exception:', ['message' => $e->getMessage()]);
            return ApiResponse::error('Error retrieving subcategories');
        }
    }
    public function getSubCategoriesByCategoryId($category_id)
    {
        try {
            $subCategories = SubCategory::where('category_id', $category_id)->get();
            return ApiResponse::success($subCategories, 'Subcategories retrieved successfully');
        } catch (\Exception $e) {
            Log::error('Exception:', ['message' => $e->getMessage()]);
            return ApiResponse::error('Error retrieving subcategories');
        }
    }

    public function createSubCategory(Request $request)
    {
        try {

            $name = $request->name;
            $categoryId = $request->category_id;
            $existingEntry = SubCategory::where('name', $name)->first();
            if (!$existingEntry) {
                $newEntry = new SubCategory([
                    'category_id' => $categoryId,
                    'name' => $name,
                ]);
                $newEntry->save();

                return ApiResponse::success($newEntry, 'SubCategory created successfully');
            } else {
                return ApiResponse::error('Duplicate entry found for name: ' . $name, 409, $name);
            }
        } catch (\Exception $e) {
            Log::error('Exception:', ['message' => $e->getMessage()]);
            return ApiResponse::error('Error updating SubCategory');
        }
    }


    public function updateSubCategory(Request $request, $categoryId, $subCategoryId)
    {
        try {
            $name = $request->name;
            $existingEntry = SubCategory::where('category_id', $categoryId)
                ->where('id', $subCategoryId)
                ->first();

            if ($existingEntry) {
                $existingEntry->update([
                    'name' => $name, // Assuming you have a 'name' field in your request for the updated name
                ]);

                return ApiResponse::success($existingEntry, 'SubCategory updated successfully');
            } else {
                Log::error('SubCategory not found for update', ['category_id' => $categoryId, 'sub_category_id' => $subCategoryId]);
                return ApiResponse::error('SubCategory not found', 404);
            }
        } catch (\Exception $e) {
            Log::error('Exception during SubCategory update', ['message' => $e->getMessage()]);
            return ApiResponse::error('Error updating SubCategory');
        }
    }

    public function EditSubCategory(Request $request, $subCategoryId)
    {
        try {
            $subCategory = SubCategory::find($subCategoryId);
            if (!$subCategory) {
                return ApiResponse::error('SubCategory not found which you want to Find', 404);
            }
            return ApiResponse::success($subCategory, 'SubCategory retrieved successfully');
        } catch (\Exception $e) {
            Log::error('Exception while fetching Subcategory', ['message' => $e->getMessage()]);
            return ApiResponse::error('Error while fetching Subcategory');
        }
    }


    public function deleteSubCategory($subCategoryId)
    {
        try {
            // Find the SubCategory by ID and Category ID
            $subCategory = SubCategory::where('id', $subCategoryId)->first();

            if (!$subCategory) {
                return ApiResponse::error('SubCategory not found', 404);
            }
            $subCategory->delete();
            return ApiResponse::success(null, 'SubCategory deleted successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Error deleting SubCategory');
        }
    }
}
