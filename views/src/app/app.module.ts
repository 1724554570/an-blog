import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';

import { InterfaceService } from './components/core/interface.service';

import { routerMatch } from './components/routers.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routerMatch
  ],
  providers: [
    { provide: 'interface', useClass: InterfaceService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
