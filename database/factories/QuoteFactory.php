<?php

$factory->define(App\Quote::class, function (Faker\Generator $faker) {
    return [
        'subtotal'   => $faker->randomFloat(2),
        'total_cost' => function(array $d) {
            return ($d['subtotal'] * 0.19) + $d['subtotal'];
        },
        'status' => 'quote',
        'client_id' => function () {
            return factory(App\Client::class)->create()->id;
        }
    ];
});