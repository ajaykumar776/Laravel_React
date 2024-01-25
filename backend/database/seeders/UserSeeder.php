<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('123456'),
            'user_type' => 'USER',
        ]);
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'user_type' => 'ADMIN',
        ]);
    }
}
