<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PostController;
use App\Http\Controllers\TwoStepsValidationController;

use App\Http\Controllers\PrecognitionFormController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('post')->controller(PostController::class)->group(function () {
    Route::get('/', 'index')->name('post.index');
    Route::get('/create', 'create')->name('post.create');
    Route::post('/', 'store')->name('post.store');
    Route::get('/{post}', 'show')->name('post.show');
    Route::get('/{post}/edit', 'edit')->name('post.edit');
    Route::put('/{post}', 'update')->name('post.update');
    Route::delete('/{post}', 'destroy')->name('post.destroy');
});

Route::get('preview_image_input', fn () => Inertia::render('PreviewImageInput/Index'));


Route::prefix('two_steps_validation')->controller(TwoStepsValidationController::class)->group(function () {
    Route::get('/create', 'create')->name('two_steps_validation.create');
    Route::post('/pre', 'preStore')->name('two_steps_validation.pre_store');
    Route::post('/', 'store')->name('two_steps_validation.store');
});

Route::get('software_keyboard', fn () => Inertia::render('SoftwareKeyboard/Index'));



Route::prefix('precognition_form')->controller(PrecognitionFormController::class)->group(function () {

    Route::get('/create', 'create')
        ->name('precognition_form.create');


    Route::post('/', 'store')
        ->middleware([HandlePrecognitiveRequests::class])
        ->name('precognition_form.store');
});


require __DIR__ . '/auth.php';
