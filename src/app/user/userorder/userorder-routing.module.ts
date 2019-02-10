import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserorderComponent } from './userorder.component';


const routes: Routes = [
  {
      path: '', component: UserorderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserorderRoutingModule { }