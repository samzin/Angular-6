import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../shared/user.service';
import {Constants} from '../../../shared/Constants';
import {TaborderModel} from '../../../shared/models/taborder.model';

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

  public serverErrorMessages = false;
  public analysisList = [];
  public solventList = [];
  public subAnalysisList = [];
  public rateObject: any;
  public sampleLimit = 1;
  public numberOfSamples = Array(100).fill(null).map( (x, i) => i = i + 1 );

  constructor(public userService: UserService) { }

  model = new TaborderModel();

  ngOnInit() {
  }

  onSubmit(tabOrder: TaborderModel) {
    console.log('tabOrder : ' + JSON.stringify(tabOrder));
    const analysisId = 1;
    this.userService.createUserTabOrder(analysisId, tabOrder)
      .subscribe(
        response => {
          console.log('response : ' + JSON.stringify(response));
        }, error => {
          console.log('error : ' + JSON.stringify(error));
        });
  }

}
