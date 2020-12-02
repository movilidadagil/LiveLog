import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import {LiveLogComponent} from './livelog/livelog.component';
const routes: Routes = [
  { path: 'livelog', component: LiveLogComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
