<?php

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
    return redirect()->route('login');
});

//Auth::routes();

// Authentication Routes...
Route::get('login', [
    'as' => 'login',
    'uses' => 'Auth\LoginController@showLoginForm'
]);
Route::post('login', [
    'as' => '',
    'uses' => 'Auth\LoginController@login'
]);
Route::post('logout', [
    'as' => 'logout',
    'uses' => 'Auth\LoginController@logout'
]);

Route::group(['middleware' => 'auth'], function () {
    Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');

    Route::get('/productos', function() {
        return view('productos');
    })->name('productos');

    Route::get('/clientes', function() {
        return view('clientes');
    })->name('clientes');

    Route::get('/cotizacion', function() {
        return view('cotizacion');
    })->name('cotizacion');

    Route::get('/facturas', function() {
        return view('facturas');
    })->name('facturas');

    // Resources routes
    Route::resource('users', 'UserController', ['except' => ['show', 'edit']]);
    Route::resource('items', 'ItemController', ['except' => ['show', 'edit']]);
    Route::resource('clients', 'ClientController', ['except' => ['show', 'edit']]);
    Route::resource('quotes', 'QuoteController');

    // PDF
    Route::get('/pdf/{id}', function($id) {
        return response()->file(storage_path("app/pdf/cotizacion-{$id}.pdf"));
    });

    // Bill
    Route::post('quotes/{id}/bill', 'QuoteController@bill');

    // Invoices

    Route::get('invoices', 'InvoiceController@index');
});

