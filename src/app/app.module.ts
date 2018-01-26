import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { DemoService } from './demo.service';   // our custom service, see below
import { SimpleTimer } from 'ng2-simple-timer';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DemoService, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
