<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $table = "subcategories";
    protected $fillable = ['name', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function userCategorySubcategories()
    {
        return $this->hasMany(UserCategorySubcategory::class);
    }
}
