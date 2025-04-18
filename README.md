git clone https://github.com/Zeinot/demo-laravel-12-rilt.git
cd demo-laravel-12-rilt
copy & rename .env
npm i --legacy-peer-deps
composer install
php artisan migrate
php artisan storage:link
in two different terminals :
php artisan serve
npm run dev

go to localhost:8000
