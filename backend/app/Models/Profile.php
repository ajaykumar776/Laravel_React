<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = ['name', 'profile_image', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'profile_categories');
    }

    public function subcategories()
    {
        return $this->belongsToMany(Subcategory::class, 'profile_subcategories');
    }
}
