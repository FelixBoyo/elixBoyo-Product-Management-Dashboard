<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('LiveOrders');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    // Display the order creation form
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');

    // Store a new order
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

    // Display a specific order
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // Update an order (e.g., change status to completed, cancel, etc.)
    Route::put('/orders/{id}', [OrderController::class, 'update'])->name('orders.update');

    // Cancel an order
    Route::delete('/orders/{id}/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
