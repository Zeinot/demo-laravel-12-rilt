<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing', ['landing' => 'landing.tsx']);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TodoController::class, 'dashboard'])->name('dashboard');

    // Redirect /todos to /dashboard
    Route::redirect('todos', 'dashboard');

    // Todo Routes (except index which is now handled by dashboard)
    Route::resource('todos', TodoController::class)->except(['index']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
