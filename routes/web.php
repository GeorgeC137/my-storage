<?php

use App\Http\Controllers\FileController;
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

Route::controller(FileController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('/my-files/{folder?}', 'myFiles')->where('folder', '(.*)')->name('myFiles');
    Route::post('/folder/create', 'createFolder')->name('folder.create');
    Route::post('/file', 'store')->name('file.store');
    Route::get('/trash', 'trash')->name('trash');
    Route::delete('/file', 'destroy')->name('file.delete');
    Route::delete('/file/delete-forever', 'deleteForever')->name('file.deleteForever');
    Route::post('/file/add-to-favorites', 'addToFavorites')->name('file.addToFavorites');
    Route::post('/file/share', 'share')->name('file.share');
    Route::post('/file/restore', 'restore')->name('file.restore');
    Route::get('/file/download', 'download')->name('file.download');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
