<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quote;
use App\Client;
use App\Item;

class QuoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request) {
        return Quote::Search($request->search, 'quote')->paginate(15);
    }

    public function store(Request $request) {
        $data = [];
        $subtotal = 0;
        foreach($request->items_invoice as $item) {
            $id = $item['product']['id'];
            $product = Item::findOrFail($id);
            $amount = $item['amount'];
            $subtotal += $item['amount'] * $product->cost;
            $data[$id] = ['amount' => $amount];
        //    $product->update(['amount' => $product->amount - $amount]);
        }
        $total = ($subtotal * 0.19) + $subtotal;
        $client = Client::findOrFail($request->client);
        $quote = new Quote(['total_cost' => $total, 'subtotal' => $subtotal]);
        $client->quotes()->save($quote);
        $quote->items()->attach($data);
        $quote->save();
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
        $subtotal = 0;
        $data = [];
        foreach($request->items_invoice as $item) {
            $id = $item['product']['id'];
            $product = Item::findOrFail($id);
            $subtotal += $item['amount'] * $product->cost;
            $data[$id] = ['amount' => $item['amount']];
        }
        $total = ($subtotal * 0.19) + $subtotal;
        $quote->update(['total_cost' => $total, 'subtotal' => $subtotal]);
        $quote->items()->sync($data);
        $quote->save();
        return response()->json(['updated' => true], 200);
    }
    public function destroy($id) {
        Quote::findOrFail($id)->delete();
        return response()->json(['deleted' => true], 200);
    }

    /**
     * Factura las cotizaciones
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bill($id) {
        $quote = Quote::with('items')->findOrFail($id);
        if($quote->status === 'quote') {
            $quote->update(['status' => 'invoice']);
            foreach($quote->items as $product) {
                $amount = $product->pivot->amount;
                $product->amount -= $amount;
                $product->save();
            }
            return response()->json(['billed' => true], 200);
        }
        return response()->json(['billed' => false], 422);
    }
}
