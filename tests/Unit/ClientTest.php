<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Client;
use App\Quote;

class ClientTest extends TestCase
{
    use DatabaseMigrations;


    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCreateClient()
    {
        $client = factory(Client::class)->create();
        $this->assertDatabaseHas('clients', $client->toArray());
    }

    public function testEditClient() {
        $client = factory(Client::class)->create();
        $dataUpdated = ['name' => 'Pedro', 'surname' => 'Alfonso'];
        $this->assertTrue($client->update($dataUpdated));
    }

    public function testRelationWithQuote() {
        $client = factory(Client::class)->create()->each(function($e) {
            $e->quotes()->save(factory(Quote::class)->make());
        });
        $this->assertTrue($client);
    }


    public function testRelationWithMultipleQuotes() {
        $client = factory(Client::class)->create()->each(function($e) {
            $e->quotes()->saveMany(factory(Quote::class, 5)->make());
        });
        $this->assertTrue($client);
    }

}
