<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Factura</title>
    <style>
        .colored {
            border-top: .2em solid #00B5AD;
        }

        .clearfix:after {
            content: "";
            display: table;
            clear: both;
        }

        a {
            color: #5D6975;
            text-decoration: underline;
        }

        body {
            position: relative;
            width: 90%;
            margin: 0 auto;
            color: #001028;
            background: #FFFFFF;
            font-family: Arial, sans-serif;
            font-size: 12px;
        }

        header {
            padding: 10px 0;
            margin-bottom: 30px;
        }

        #logo {
            text-align: center;
            margin-bottom: 10px;
        }

        #logo img {
            width: 150px;
        }

        h1 {
            border-top: 1px solid #5D6975;
            border-bottom: 1px solid #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
        }

        #project {
            position: relative;
            left: 0;
        }

        #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
        }
        .contenedor {
            position:relative;
        }
        #company {
            position: absolute;
            right: 0;
            top: 0;
            text-align: right;
        }

        #project div,
        #company div {
            white-space: nowrap;
        }

        #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
        }

        footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
        }

    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/components/table.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/components/segment.min.css">
</head>
<body>
<header class="clearfix">
    <div id="logo">
        <img src="http://litam.maedcagts.com/images/litam.png">
    </div>
    <h1>Factura {{ $quote->id }}</h1>
    <div class="contenedor">
        <div id="project">
            <div><span>CLIENTE</span> {{ $quote->client->name . ' ' . $quote->client->surname }}</div>
            <div><span>DIRECCIÓN</span> {{ $quote->client->address }}</div>
            <div><span>EMAIL</span> <a href="mailto:john@example.com">john@example.com</a></div>
            <div><span>FECHA</span> {{ Carbon\Carbon::parse($quote->created_at)->format('Y-m-d') }}</div>
        </div>
        <div id="company" class="clearfix">
            <div>Litam</div>
            <div>Bogotá D.C</div>
        </div>
    </div>
</header>
<main>
    <table class="ui single line table teal">
        <thead>
        <tr>
            <th class="service">Servicio</th>
            <th class="desc">Descripción</th>
            <th>Precio</th>
            <th>Cant.</th>
            <th>TOTAL</th>
        </tr>
        </thead>
        <tbody>
        @foreach($quote->items as $product)
            <tr>
                <td class="service">{{ $product->name }}</td>
                <td class="desc">{{ $product->description }}</td>
                <td class="unit">@money($product->cost, 'COP')</td>
                <td class="qty">{{ $product->pivot->amount }}</td>
                <td class="total">@money($product->cost * $product->pivot->amount, 'COP', true)</td>
            </tr>
        @endforeach
        </tbody>
        <tfoot>
        <tr>
            <th colspan="4" class="right aligned colored">SUBTOTAL</th>
            <th class="total colored"> @money($quote->subtotal, 'COP', true)</th>
        </tr>
        <tr>
            <th colspan="4" class="right aligned">IVA 19%</th>
            <th class="total">@money($quote->total_cost - $quote->subtotal, 'COP', true)</th>
        </tr>
        <tr>
            <th colspan="4" class="right aligned grand total">TOTAL</th>
            <th class="grand total">@money($quote->total_cost, 'COP', true)</th>
        </tr>
        </tfoot>
    </table>
    <div id="notices">
        <div>NOTA:</div>
        <div class="notice">Esta cotización fue generada automáticamente.</div>
    </div>
</main>
<footer>
    Esta factura fue generada automáticamente.
</footer>
</body>
</html>