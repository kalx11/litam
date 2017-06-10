<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>
    <link rel="stylesheet" id="bulma" href="{{ mix('css/app.css') }}"/>
</head>
<body>
<div id="app" class="login-wrapper columns">
    <div class="column is-8 is-hidden-mobile hero-banner">
        <section class="hero is-fullheight is-dark">
            <div class="hero-body">
                <div class="container section">
                    <div class="has-text-right">
                        <h1 class="title is-1">Login</h1> <br>
                        <p class="title is-3">Secure User Account Login</p>
                    </div>
                </div>
            </div>
            <div class="hero-footer">
                <p class="has-text-centered">Copyright 2017</p>
            </div>
        </section>
    </div>
    <div class="column is-4">
        <section class="hero is-fullheight">
            <div class="hero-heading">
                <div class="section has-text-centered">
                    <h1 class="title"></h1>
                </div>
            </div>
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-9 is-offset-2">
                            <h1 class="avatar has-text-centered section">
                                <img src="{{ asset('images/litam.png') }}">
                            </h1>
                            <div class="login-form">
                                <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                                    {{ csrf_field() }}
                                <p class="control has-icon has-icon-right">
                                    <input name="email" class="input email-input {{ $errors->has('email') ? ' is-danger' : '' }}" type="email" placeholder="correo@example.org">
                                    <span class="icon user">
                                      <i class="fa fa-user"></i>
                                    </span>
                                </p>
                                    @if($errors->has('email'))
                                    <span class="help is-danger has-text-centered"> {{ $errors->first('email') }}</span>
                                    @endif
                                <p class="control has-icon has-icon-right">
                                    <input name="password" class="input password-input {{ $errors->has('email') ? ' is-danger' : '' }}" type="password" placeholder="●●●●●●●">
                                    <span class="icon user">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </p>
                                    @if($errors->has('password'))
                                        <span class="help is-danger has-text-centered"> {{ $errors->first('password') }}</span>
                                    @endif
                                <p class="control login">
                                    <button type="submit" class="button is-success is-outlined is-large is-fullwidth">Login</button>
                                </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>