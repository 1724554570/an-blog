import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// 支持npm install --save-dev @angular/material @angular/cdk 最新版本5.2.5
// npm install --save-dev hammerjs
// import 'hammerjs';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
