<?php


namespace App\Observers;

use App\Quote;
use PDF;
use DB;

class QuoteObserver
{
    public function created(Quote $quote) {
        $this->makePdf($quote);
    }

    public function updated(Quote $quote) {
        $this->makePdf($quote);
    }

    private function makePdf(Quote $quote) {
        $fileName  = str_slug('Cotizacion ' . $quote->id) . '.pdf';
        $path = storage_path('app/pdf/' . $fileName);
        $data = ['quote' => $quote->load('client:id,name,surname,address', 'items')];
        PDF::loadView('pdf.invoice', $data)->setPaper('a4', 'landscape')->save($path);
    }
}