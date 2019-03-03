import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {CIFConstants, Constants} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';

@Component({
  selector: 'app-order-form',
  templateUrl: 'order-form.component.html'
})

export class OrderFormComponent implements OnInit {

  @Input() formType: String;

  selectedAnalysisName = '';
  selectedSubAnalysisName = '';
  selectedSolventName = '';
  selctedNumberOfSamples = 1;
  solventRate = 0;

  public serverErrorMessages = false;
  public analysisList = [];
  public solventList = Constants.SOLVENT_LIST;
  public solventProviderList = Constants.SOLVENT_PROVIDER_LIST;
  public subAnalysisList = Constants.SUBANALYSIS;
  public rateObject = Constants.RATE_OBJECT;
  public showSolventForAnalysis = CIFConstants.SOLVENT_NAME;
  public showSolventByUserType = CIFConstants.USER_TYPE;
  public numberOfSamples = Array(100).fill(null).map( (x, i) => i = i + 1 );

  constructor(public userService: UserService) { }

  model = new TaborderModel();

  ngOnInit() {
    this.getAllAnalysis();
  }

  getAllAnalysis() {
    this.userService.getAllAnalysisList().subscribe(res => {
        console.log('Success analysis list :');
        this.analysisList = Constants.ANALYSIS_LIST;
      }, err => {
        console.log('Error analysis list : ', JSON.stringify(err));
        this.analysisList = Constants.ANALYSIS_LIST;
      }
    );
  }

  setSelectedSolvent(solventName) {
    console.log('Selected Solvent : ' + solventName);
    const selectedSolvent = this.solventList.filter(function (solvent) {
      return solvent.solventname === solventName;
    });
    if (selectedSolvent.length === 1) {
      this.solventRate = selectedSolvent[0].rate;
      this.model.solvent_Rate = selectedSolvent[0].rate;
      this.model.solvent_id = selectedSolvent[0].solid;
    }
  }

  getAllSubAnalysis() {
    const body = {};
    this.userService.getAllSubAnalysisList(body).subscribe(res => {
        console.log('Success analysis list :');
        this.analysisList = Constants.ANALYSIS_LIST;
      }, err => {
        console.log('Error analysis list : ');
        this.analysisList = Constants.ANALYSIS_LIST;
      }
    );
  }

  getAllSolvents() {
    const body = {};
    this.userService.getAllSolventByAnalysisId(body).subscribe(res => {
        console.log('Success getAllSolvent :');
        this.analysisList = Constants.ANALYSIS_LIST;
      }, err => {
        console.log('Error getAllSolvent list : ');
        this.analysisList = Constants.ANALYSIS_LIST;
      }
    );
  }

  selectedAnalysis(selectedAnalysisName) {
    console.log('Selected AnalysisName : ' + selectedAnalysisName);
    const selectedAnalysis = this.analysisList.filter(function (analysis) {
      return analysis.analysisname === selectedAnalysisName;
    });
    if (selectedAnalysis.length === 1) {
      this.clearFieldsExceptAnalysis();
      this.model.aid = selectedAnalysis[0].aid;
    }
  }

  clearFieldsExceptAnalysis() {
    this.model = new TaborderModel();
    this.selectedSubAnalysisName = '';
    this.selectedSolventName = '';
    this.selctedNumberOfSamples = 1;
  }

  getRateObject() {
    const body = {};
    this.userService.getRateBySubanalysisId(body).subscribe(res => {
        console.log('Success getAllSolvent :');
      }, err => {
        console.log('Error getAllSolvent list : ');
      }
    );
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
