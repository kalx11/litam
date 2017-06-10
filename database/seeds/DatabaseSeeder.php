<?php

use Illuminate\Database\Seeder;
use App\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

       $user = User::create([
            'name' => 'Administrador',
            'email' => 'admin@example.com',
            'password' => 'admin',
            'code' => '1234567',
            'rol' => 'admin',
            'type' => 'cedula'
        ]);
    }
}
