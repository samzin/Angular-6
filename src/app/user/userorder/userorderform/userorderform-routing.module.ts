import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserorderformComponent } from './userorderform.component';
const routes: Routes = [
  {
      path: '', component: UserorderformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserorderformRoutingModule { }