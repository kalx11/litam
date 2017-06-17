<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Litam</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
</head>
<body>
<div id="app">
    <div class="columns">
        <aside class="column is-2 aside hero is-fullheight is-hidden-mobile">
            <div>
                <div class="main">
                    <div class="title">Inicio</div>
                    <a href="{{ route('home') }}" class="item @active('home')"><span class="icon"><i class="fa fa-home"></i></span><span
                                class="name">Inicio</span></a>
                    @role('admin')
                    <a href="{{ route('productos') }}" class="item @active('productos')"><span class="icon"><i class="fa fa-shopping-cart"></i></span><span
                                class="name">Productos</span></a>
                    @endrole
                    <a href="{{ route('clientes') }}" class="item @active('clientes')">
                        <span class="icon"> <i class="fa fa-users" aria-hidden="true"></i></span>
                        <span class="name">Clientes</span>
                    </a>
                    <a href="{{ route('cotizacion') }}" class="item @active('cotizacion')">
                        <span class="icon"><i class="fa fa-file-text" aria-hidden="true"></i></span>
                        <span class="name">Cotización</span>
                    </a>
                    <a href="{{ route('facturas') }}" class="item @active('facturas')">
                        <span class="icon"><i class="fa fa-money" aria-hidden="true"></i></span>
                        <span class="name">Facturas</span>
                    </a>
                    <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="item"><span class="icon"><i class="fa fa-sign-out"></i></span><span class="name">Salir</span></a>
                </div>
            </div>
        </aside>
        <div class="column is-10 admin-panel">

            <nav class="nav has-shadow is-fullwidth" id="top">
                <div class="container">
                    <div class="nav-left">
                        <a class="nav-item" href="">
                            <img src="{{ asset('images/litam.png') }}" alt="Litam" class="image">
                        </a>
                    </div>
                    <span class="nav-toggle" :class="{ 'is-active':menu }" v-on:click="menu = !menu">
            <span></span>
            <span></span>
            <span></span>
          </span>
                    <div class="nav-right nav-menu is-hidden-tablet" :class="{ 'is-active':menu }">
                        <a href="{{ route('home') }}" class="nav-item is-active">
                            Inicio
                        </a>
                        @role('admin')
                        <a href="{{ route('productos') }}" class="nav-item">
                            Productos
                        </a>
                        @endrole
                        <a href="{{ route('clientes') }}" class="nav-item">
                            Clientes
                        </a>
                        <a href="{{ route('cotizacion') }}" class="nav-item">
                            Cotizaciones
                        </a>
                        <a href="{{ route('facturas') }}" class="nav-item">
                            Facturas
                        </a>
                        <a href="{{ route('logout') }}" class="nav-item" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            Salir
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </div>
                </div>
            </nav>
            <section class="section">
                @yield('content')
            </section>
        </div>
    </div>
    <footer class="footer">
        <div class="container">
            <div class="has-text-centered">
                <p>
                    Hecho para <strong>Litam</strong> con <a href=""><i class="fa fa-heart" aria-hidden="true"></i></a>.
                </p>
            </div>
        </div>
    </footer>
</div>
<!-- Scripts -->
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
