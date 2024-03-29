<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;
use App\Http\Requests\ItemRequest;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Storage;

class ItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->has('page')) {
            return Item::Search($request->search)->paginate(15);
        } else {
            return Item::Search($request->search)->get(['name', 'description', 'id', 'cost']);
        }

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\ItemRequest|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRequest $request)
    {
        if(Auth::user()->rol === 'admin') {
            $data = $request->only(['name', 'amount', 'cost', 'description']);
            $result = Item::create($data);
            return response()->json(['created' => isset($result)]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\ItemRequest|\Illuminate\Http\Request $request
     * @param  \App\Item                                              $item
     * @return \Illuminate\Http\Response
     */
    public function update(ItemRequest $request, Item $item)
    {
        $result = $item->update($request->all());
        return response()->json(['updated' => $result]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        if(Auth::user()->rol === 'admin') {
            return response()->json(['deleted' => $item->delete()], 200);
        }
        return response()->json(['User has no permissions'], 401);
    }

    public function import(Request $request) {
        $this->validate($request, [
            'file' => 'required|file'
        ]);
        $path = $request->file->storeAs('excel', 'file.' . $request->file('file')->getClientOriginalExtension());
        $path = storage_path('app/' . $path);
        Excel::filter('chunk')->load($path)->chunk(200,function ($reader) {
            $reader->each(function($row){
                $data = [
                    'name' => $row->nombre,
                    'description' => $row->descripcion,
                    'amount' => $row->cantidad,
                    'cost' => $row->precio
                ];
                Item::create($data);
            });
        });
        Storage::disk('local')->delete($path);
        return response()->json(['imported' => true], 200);
    }
}
