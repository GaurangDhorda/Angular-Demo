
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log('production mode detected');
}

// platformBrowserDynamic().bootstrapModule(AppModule)
  // .catch(err => console.error(err));


document.addEventListener('DOMContentLoaded', () => {
                                                                                                          platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/Angular-Demo/ngsw-worker.js');
    }
  }).catch(err => console.log(err));
                                                                                                        });
