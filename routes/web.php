<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TodoController::class, 'dashboard'])->name('dashboard');
    
    // Todo Routes
    Route::resource('todos', TodoController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
