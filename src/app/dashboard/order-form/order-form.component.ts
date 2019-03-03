import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {Constants} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';

@Component({
  selector: 'app-order-form',
  templateUrl: 'order-form.component.html'
})

export class OrderFormComponent implements OnInit {

  @Input() formType: String;

  public serverErrorMessages = false;
  public analysisList = Constants.ANALYSIS_LIST;
  public solventList = Constants.SOLVENT_LIST;
  public subAnalysisList = Constants.SUBANALYSIS;
  public rateObject = Constants.RATE_OBJECT;
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
