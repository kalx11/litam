@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="columns">
        @role('admin')
        <users class="column is-12"></users>
        @endrole
        @role('vendedor')
            <cotizaciones class="column is-12"></cotizaciones>
        @endrole
        
        </div>
    </div>
@endsection
