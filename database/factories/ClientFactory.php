<?php

$factory->define(App\Client::class, function (Faker\Generator $faker) {
    return [
      
        'name' => $faker->firstName,
        'surname' => $faker->lastName,
        'type' => $faker->randomElement(['nit', 'cedula']),
        'address' => $faker->address,
        'code' => $faker->randomNumber(5),
        'city' => $faker->city,
        'phone' => $faker->randomNumber(5)
    ];
});