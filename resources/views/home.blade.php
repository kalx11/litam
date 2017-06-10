@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="columns">
        @role('admin')
        <users class="column is-12"></users>
        @endrole
        @role('vendedor')

        @endrole
        
        </div>
    </div>
@endsection
