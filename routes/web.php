<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

use App\Http\Controllers\UserController;
use App\Http\Controllers\WebSocketController;
use App\Http\Controllers\CryptoTradeController;

Route::post('/websocket', [WebSocketController::class, 'handle']);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/user-data', function () {
    if(Auth::user()){
        return Auth::user();
    }
    return 'error';
});//->middleware('auth');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Auth::routes();

Route::get('/trade', [App\Http\Controllers\CryptoTradeController::class, 'index']);

Route::view('/{path?}', 'welcome')
    ->where('path', '.*');


