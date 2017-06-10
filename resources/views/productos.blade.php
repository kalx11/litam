@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="columns">
            @role('admin')
            <productos class="column is-12"></productos>
            @endrole
            @role('vendedor')

            @endrole
        </div>
    </div>
@endsection
