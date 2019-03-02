import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../shared/user.service';
import { Constants } from './../../shared/Constants';
import { RegistrationModel } from 'src/app/shared/models/registartion.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  public userTypes = Constants.USER_TYPE_OBJECTS;
  public registartionModel = new RegistrationModel();

  constructor(public userService: UserService) { }

  onSubmit(registartion: RegistrationModel) {
    console.log('registartion  '+JSON.stringify(registartion));
    this.userService.postUser(registartion).subscribe(
      res => {
        console.log('login success  '+JSON.stringify(registartion));
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        //this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
