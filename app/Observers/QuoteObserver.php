<?php


namespace App\Observers;

use App\Quote;
use PDF;
use DB;
use Storage;
use Jenssegers\Date\Date;

class QuoteObserver
{
    public function saved(Quote $quote) {
        $this->makePdf($quote);
    }

    public function updated(Quote $quote) {
        $this->makePdf($quote);
    }
    public function deleted(Quote $quote) {
        $path = 'pdf/cotizacion-' . $quote->id . '.pdf';
        if(Storage::disk('local')->exists($path)) {
            Storage::disk('local')->delete($path);
        }
    }
    private function makePdf(Quote $quote) {
        Date::setLocale('es');
        $fileName  = str_slug('Cotizacion ' . $quote->id) . '.pdf';
        $path = storage_path('app/pdf/' . $fileName);
        $data = ['quote' => $quote->load('client:id,name,surname,address,email', 'items')];
        PDF::loadView('pdf.invoice2', $data)->setPaper('a4', 'portrait')->save($path);
    }
}