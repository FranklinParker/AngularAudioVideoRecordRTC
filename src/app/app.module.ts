import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecordVideoComponent } from './record-video/record-video.component';
import { RecordAudioComponent } from './record-audio/record-audio.component';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {PostRecordedFileService} from './service/post-recorded-file.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RecordVideoComponent,
    RecordAudioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    PostRecordedFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
