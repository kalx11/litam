<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemQuoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_quote', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('amount');
            $table->integer('item_id')->unsigned();
            $table->integer('quote_id')->unsigned();
            $table->foreign('item_id')->references('id')->on('items');
            $table->foreign('quote_id')->references('id')->on('quotes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_quote');
    }
}
