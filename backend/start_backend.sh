lsof -t -i:8000 | xargs kill -9
php artisan serve --port=8000