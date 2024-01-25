<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCategorySubcategory extends Model
{


    protected $table = "usercategorysubcategories";
    protected $fillable = ['user_id', 'category_id', 'subcategory_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }
}
