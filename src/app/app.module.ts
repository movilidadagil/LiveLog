import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlackService} from './slack.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FooterComponent} from "./footer/footer.component";
import {BannerComponent} from "./banner/banner.component";

import { HeadertestComponent} from "./header/headertest.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
// @ts-ignore
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UploadModule } from './upload/upload.module';
import {LiveLogComponent} from './livelog/livelog.component';
import {LivelogService} from './livelog/livelog.service';

@NgModule({
  declarations: [
    AppComponent,
    LiveLogComponent,

    FooterComponent,
     BannerComponent,
        HeadertestComponent
  ],
    exports:[
        FormsModule,
        ReactiveFormsModule
    ],
  imports: [
    AppRoutingModule,
    CommonModule,
       HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    UploadModule
  ],
   schemas: [
        NO_ERRORS_SCHEMA
      ],
  providers: [LivelogService,SlackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
