<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Schema;
use Blade;
use Request;
use App\Quote;
use App\Observers\QuoteObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Quote::observe(QuoteObserver::class);

        Schema::defaultStringLength(191);

        // Add @continue for Loops
        Blade::directive('role', function($rol)
        {
            return "<?php if(\Auth::user()->rol === $rol): ?>";
        });
        Blade::directive('endrole', function($expression)
        {
            return '<?php endif; ?>';
        });

        Blade::directive('active', function ($path) {
          return "<?= Request::path() === $path ? 'active' : '' ?>";
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
