<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Apis\CategoryController;
use App\Http\Controllers\Apis\SubCategoryController;
use App\Http\Controllers\Apis\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/forgot-password/{email}', [AuthController::class, 'forgotPassword']);
Route::post('/update-password', [AuthController::class, 'updatePassword']);

Route::prefix('categories')->group(function () {
    Route::get('', [CategoryController::class, 'getAllCategories']);
    Route::post('', [CategoryController::class, 'createCategory']);
    Route::put('/{categoryId}', [CategoryController::class, 'updateCategory']);
    Route::get('/{categoryId}', [CategoryController::class, 'EditCategory']);
    Route::delete('/{categoryId}', [CategoryController::class, 'deleteCategory']);
});

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::get('/users', [UserController::class, 'getAllUsers']);
    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    Route::put('/users/{id}', [UserController::class, 'updateUser']);

    Route::get('/userDetails/{userId}', [UserController::class, 'getUserWithCategorySubcategory']);
    Route::put('/userDetails/{userId}', [UserController::class, 'updateUserrWithCategorySubcategory']);

    Route::post('logout', [AuthController::class, 'logout']);
    Route::put('/update/profile', [AuthController::class, 'updateProfile']);
    Route::get('/user/profile', [AuthController::class, 'getProfile']);

    Route::prefix('subcategories')->group(function () {
        Route::get('', [SubCategoryController::class, 'getAllSubCategories']);
        Route::get('getSubcategory/{category_id}', [SubCategoryController::class, 'getSubCategoriesByCategoryId']);
        Route::post('', [SubCategoryController::class, 'createSubCategory']);
        Route::put('/{categoryId}/{subCategoryId}', [SubCategoryController::class, 'updateSubCategory']);
        Route::get('/{subCategoryId}', [SubCategoryController::class, 'EditSubCategory']);

        Route::delete('/{subCategoryId}', [SubCategoryController::class, 'deleteSubCategory']);
    });
    Route::prefix('categories')->group(function () {
        Route::get('', [CategoryController::class, 'getAllCategories']);
        Route::post('', [CategoryController::class, 'createCategory']);
        Route::put('/{categoryId}', [CategoryController::class, 'updateCategory']);
        Route::get('/{categoryId}', [CategoryController::class, 'EditCategory']);
        Route::delete('/{categoryId}', [CategoryController::class, 'deleteCategory']);
    });
});
