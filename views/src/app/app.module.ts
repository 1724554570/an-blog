import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { InterfaceService } from './components/core/interface.service';
import { routerMatch } from './components/routers.module';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routerMatch,
    // MAT TMPL
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
  ],
  exports: [
    // MAT TMPL
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: 'interface', useClass: InterfaceService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
