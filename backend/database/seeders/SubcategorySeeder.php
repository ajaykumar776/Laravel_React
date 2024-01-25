<?php

namespace Database\Seeders;

use App\Models\Subcategory;
use Illuminate\Database\Seeder;

class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Electronics subcategories
        Subcategory::create(['name' => 'Smartphones', 'category_id' => 1]);
        Subcategory::create(['name' => 'Laptops', 'category_id' => 1]);
        Subcategory::create(['name' => 'Tablets', 'category_id' => 1]);
        Subcategory::create(['name' => 'Headphones', 'category_id' => 1]);
        Subcategory::create(['name' => 'Cameras', 'category_id' => 1]);

        // Clothing subcategories
        Subcategory::create(['name' => 'Shirts', 'category_id' => 2]);
        Subcategory::create(['name' => 'Dresses', 'category_id' => 2]);
        Subcategory::create(['name' => 'Jeans', 'category_id' => 2]);
        Subcategory::create(['name' => 'T-shirts', 'category_id' => 2]);
        Subcategory::create(['name' => 'Sweaters', 'category_id' => 2]);

        // Books subcategories
        Subcategory::create(['name' => 'Fiction', 'category_id' => 3]);
        Subcategory::create(['name' => 'Non-fiction', 'category_id' => 3]);
        Subcategory::create(['name' => 'Science Fiction', 'category_id' => 3]);
        Subcategory::create(['name' => 'Mystery', 'category_id' => 3]);
        Subcategory::create(['name' => 'Biography', 'category_id' => 3]);

        // Home Appliances subcategories
        Subcategory::create(['name' => 'Refrigerators', 'category_id' => 4]);
        Subcategory::create(['name' => 'Washing Machines', 'category_id' => 4]);
        Subcategory::create(['name' => 'Microwaves', 'category_id' => 4]);
        Subcategory::create(['name' => 'Air Conditioners', 'category_id' => 4]);
        Subcategory::create(['name' => 'Vacuum Cleaners', 'category_id' => 4]);

        // Furniture subcategories
        Subcategory::create(['name' => 'Sofas', 'category_id' => 5]);
        Subcategory::create(['name' => 'Tables', 'category_id' => 5]);
        Subcategory::create(['name' => 'Chairs', 'category_id' => 5]);
        Subcategory::create(['name' => 'Beds', 'category_id' => 5]);
        Subcategory::create(['name' => 'Cabinets', 'category_id' => 5]);
    }
}
