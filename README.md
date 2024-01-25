# Project Details

This document outlines the requirements and implementation details for the small website project. The project aims to create a website with several pages, including a home page, login/register/forgot password page, dashboard, update profile, and admin page to manage categories and subcategories. The project should be developed using Laravel for the backend and ReactJS for the frontend.

# Project Features

1. Home Page: The home page should include a menu, an image slider, and a list of profiles with photos and names.
2. Login & Register & Forgot Password Page: These pages should allow users to login, register, and reset their password using email and password credentials.
3. Dashboard: After logging in, users should be directed to a dashboard.
Update Profile: Users should have the ability to update their profile information, including their name and photo.
4. Admin Page: An admin page should be available to manage categories and subcategories. The same login page should be used for both admin and user roles.
5. Categories and Subcategories: Admins can set multiple categories and subcategories for each profile.

## Requirements to run the Projects 

- PHP version 7.3 or higher, or PHP     version 8.0
- Laravel Framework version 8.75
- Composer (Dependency Manager for PHP)

## Installation

1. **Clone the repository:**

- move to backend 
- cd backend

git clone Links:
1. composer install
2. cp .env.example .env
3. php artisan key:generate
4. php artisan migrate
5. php artisan db:seed
6. php artisan serve --port=8000


# Frontend

Step 1.  move to frontend
Step 2.  cd frontend 
Step 3.  find this file AxiosInstance.js in frontend and  set the baseUrl= http://Localhost:8000

- npm install
- npm start

# Collection Details 
# file i have mention in Emails.














