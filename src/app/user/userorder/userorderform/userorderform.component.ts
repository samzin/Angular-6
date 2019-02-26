//UserorderformComponent
import { Component, OnInit ,NgModule} from '@angular/core';
import { NgForm ,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../shared/user.service'

@Component({
  selector: 'app-userorderform',
  templateUrl: './userorderform.component.html',
  styleUrls: ['./userorderform.component.css']
})

@NgModule({
  declarations: [UserorderformComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class UserorderformComponent implements OnInit {

  public userTypes=['Select User Type','Campus','Colleges','Govt.','LC-MS/MS(BioMolecules)* Chromatogram (LC+MS/MS)+Identificati','Other University'];

  constructor(public userService: UserService) { }
  model ={
    email :'',
    password:''
  };

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

  }

}
