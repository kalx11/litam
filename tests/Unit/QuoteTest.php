<?php

namespace Tests\Unit;

use function storage_path;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Quote;
use Storage;

class QuoteTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testIfExistPdfFile()
    {
        $quote = factory(Quote::class)->create();
        $fileName = 'cotizacion-' . $quote->id . '.pdf';
        $path = 'pdf/' . $fileName;
        $result = Storage::disk('local')->exists($path);
        $this->assertTrue($result);
    }
}
