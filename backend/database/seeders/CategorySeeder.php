<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;


class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create(['name' => 'Electronics']);
        Category::create(['name' => 'Clothing']);
        Category::create(['name' => 'Books']);
        Category::create(['name' => 'Home Appliances']);
        Category::create(['name' => 'Furniture']);
    }
}
