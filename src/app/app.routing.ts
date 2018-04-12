import { RouterModule, Routes } from '@angular/router';
import {RecordAudioComponent} from './record-audio/record-audio.component';
import {RecordVideoComponent} from './record-video/record-video.component';

const routes: Routes = [
  { path: '', component: RecordAudioComponent },
  { path: 'video', component: RecordVideoComponent},
];

export const routing = RouterModule.forRoot(routes);
