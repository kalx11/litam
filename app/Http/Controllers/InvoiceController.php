<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quote;

class InvoiceController extends Controller
{
    public function index(Request $request) {
        return Quote::Search($request->search, 'invoice')->paginate(15);
    }
}
