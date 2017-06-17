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
            color: blue;
            text-decoration: underline;
        }

        body {
            position: relative;
            width: 90%;
            margin: 0 auto;
            color: #001028;
            background: #FFFFFF;
            font-family: Arial, sans-serif;
        }

        header {
            padding: 10px 0;
            margin-bottom: 30px;
        }

        #logo {
            float: right;
            margin-bottom: 10px;
        }

        #logo img {
            width: 150px;
        }

        h2 {
            color: red;
            font-weight: normal;
            text-align: left;
            margin-bottom: 60px;
        }

        #project {
            position: relative;
            left: 0;
        }

        #project span {
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
        }

        .contenedor {
            position: relative;
        }

        #company {
            position: absolute;
            right: 0;
            top: 40px;
            text-align: justify;
        }

        #project div,
        #company div {
            white-space: nowrap;
        }

        #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
        }

        .sininterlineado {
            line-height: 0;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        .table th, .table td {
            width: 25%;
            text-align: center;
            border: 1px solid #000;
            padding: 0.8em;
        }
        .nota {
            color: #122E6A;
        }
        .salto {
        }

    </style>
</head>
<body>
<header class="clearfix">
    <div id="logo">
        <img src="images/litam.png">
    </div>
    <div class="clearfix"></div>
    <div class="contenedor">
        <div style="float: left; line-height:1">
            <div><span>Bogotá D.C. {{ Jenssegers\Date\Date::parse($quote->created_at)->format('j \d\e F \d\e Y') }}  </span></div>
            <div style="margin-top: 80px;">
                <p><strong>Señor:</strong></p>
                <p><strong>{{ $quote->client->name . ' ' . $quote->client->surname }}</strong></p>
            </div>
        </div>
        <div style="float: right; text-align: justify">
            <div><p>COTIZACIÓN</p></div>
            <div>No. {{ $quote->id }}</div>
        </div>
    </div>
</header>
<main>
    <p>REF: Cotización Suministro Licencias<br>
        De acuerdo a su amable solicitud, nos permitimos presentar a su consideración la cotización
        para el suministro de licencias.</p>
    <table class="table" style="margin-bottom: 40px;">
        <thead>
        <tr>
            <th>N°</th>
            <th class="sininterlineado">
                <p>PRODUCTO</p>
                <p>SERVICIO</p>
            </th>
            <th>DESCRIPCIÓN</th>
            <th>CANT.</th>
            <th nowrap="nowrap">VALOR UNIT.</th>
            <th nowrap="nowrap">VALOR TOTAL</th>
        </tr>
        </thead>
        <tbody>
        @foreach($quote->items as $product)
            <tr>
                <td> {{ $loop->iteration }}</td>
                <td> {{ $product->name }}</td>
                <td> {{ $product->description }}</td>
                <td> {{ $product->pivot->amount }}</td>
                <td class="white-space: nowrap;" nowrap="nowrap"> @money($product->cost, 'COP')</td>
                <td class="white-space: nowrap;" nowrap="nowrap"> @money($product->cost * $product->pivot->amount, 'COP', true)</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <table class="table" style="margin-bottom: 40px;">
        <thead>
            <tr>
                <th>SUBTOTAL</th>
                <th>TOTAL</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>@money($quote->subtotal, 'COP', true)</td>
            <td>@money($quote->total_cost, 'COP', true)</td>
        </tr>
        </tbody>
    </table>
    <h2>Los precios descritos en esta cotización Incluyen Iva.</h2>
    <p class="nota salto">
        Nota: Si require un Licenciamiento Corporativo de Microsoft que se expida a nombre del
        usuario final y con soporte brindado por Microsoft , existen los contratos de licenciamiento
        OLP y SPLA estos contratos se expiden para un minimo de 10 Licencias y hasta 200
        Licencias.</p>

    <p>CONTENIDO DE LA COMPRA</p>
    <ul>
    @foreach($quote->items as $product)
        <li> {{ $product->name }}</li>
    @endforeach
    </ul>

    <p>TIEMPO DE ENTREGA:</p>
    <ul>
    <li>24 Horas después de recibido el pago para Licencias Electrónicas.</li>
    <li> 3 Días después de recibido el pago para Licencias OEM COA, OEMBOX, Contrato OLP y Contrato SPLA.</li>
    </ul>

   <p> VALIDES DE LA OFERTA: 10 Dias</p>
    <p> FORMA DE PAGO: Anticipada</p>
    <p> MEDIOS DE PAGO: Consignación, Transferencia, Tarjeta de Credito, Tarjeta Debito</p>

    <p>
    CRISTINA CARDONA<br>
    Bogotá Tel: 350 4970622<br>
    E-mail: <a>ventas@licenciaswindows.com</a>
    </p>

    <p style="color: #4F81BD">DATOS DE PAGO</p>
    <p>
        <img src="images/bancolombia.png" width="300px"><br>
        #46748668632 Ahorros a nombre<br>
        de KaL Soluciones SAS<br>
        <img src="images/bancodebogota.jpg" width="300px"><br>
        #145087458 Corriente a nombre<br>
        de KaL Soluciones SAS
    </p>
</main>

</body>
</html>