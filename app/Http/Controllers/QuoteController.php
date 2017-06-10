<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quote;
use App\Client;
use phpDocumentor\Reflection\Types\Boolean;

class QuoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        return Quote::with('client:id,name,surname')->paginate(15);
    }

    public function store(Request $request) {
        $client = Client::findOrFail($request->client);
        $quote = new Quote(['total_cost' => $request->total_cost]);
        $client->quotes()->save($quote);
        foreach($request->items_invoice as $item) {
            $id = $item['product']['id'];
            $amount = $item['amount'];
            $quote->items()->attach($id, ['amount' => $amount]);
        }
        return response()->json(['created' => true], 200);
    }


    /**
     * @param $id
     * @return \App\Quote|\Illuminate\Database\Eloquent\Builder
     */
    public function show($id) {
        return Quote::with('items', 'client:id,name,surname')->find($id);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Quote               $quote
     * @return \Illuminate\Http\JsonResponse
     * @internal param $id
     */
    public function update(Request $request, Quote $quote) {
        $client = Client::find($request->client);
        $quote->client()->associate($client);
        $quote->total_cost = $request->total_cost;
        $data = [];
        foreach($request->items_invoice as $item) {
            $id = $item['product']['id'];
            $data[$id] = ['amount' => $item['amount']];
        }
        $quote->items()->sync($data);
        $quote->save();
        return response()->json(['updated' => true], 200);
    }
}
