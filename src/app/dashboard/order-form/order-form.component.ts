import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {CIFConstants, Constants} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {RateModel} from '../../shared/models/rate.model';

@Component({
  selector: 'app-order-form',
  templateUrl: 'order-form.component.html'
})

export class OrderFormComponent implements OnInit {

  @Input() formType: String;

  model = new TaborderModel();
  selectedAnalysisName = '';
  selectedSubAnalysisName = '';
  selectedSolventName = '';
  selctedNumberOfSamples = 1;
  solventRate = 0;

  public serverErrorMessages = false;
  public analysisList = [];
  public solventList = [];
  public solventProviderList = [];
  public subAnalysisList = [];
  public rateObject = new RateModel();

  public showSolventForAnalysis = CIFConstants.ANALYSIS_NAME_FOR_SOLVENT;
  public showSolventByUserType = CIFConstants.USER_TYPE;
  public numberOfSamples = Array(100).fill(null).map( (x, i) => i = i + 1 );

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getAllAnalysis();
  }

  getAllAnalysis() {
    this.userService.getAllAnalysisList().subscribe(res => {
        console.log('Success analysis list.');
        this.analysisList = Constants.ANALYSIS_LIST;
      }, err => {
        console.log('Error analysis list.', JSON.stringify(err));
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
      this.getAllSubAnalysis();
      if (selectedAnalysisName === CIFConstants.ANALYSIS_NAME_FOR_SOLVENT) {
        this.getAllSolvents();
      }
    }
  }

  getAllSubAnalysis() {
    const body = {
      analysisName : this.selectedAnalysisName
    };
    this.userService.getAllSubAnalysisList(body).subscribe(res => {
        console.log('Success analysis list :');
        this.subAnalysisList = Constants.SUBANALYSIS;
      }, err => {
        console.log('Error analysis list : ');
        this.subAnalysisList = Constants.SUBANALYSIS;
      }
    );
  }

  getAllSolvents() {
    const analysisId = this.model.aid;
    this.userService.getAllSolventByAnalysisId(analysisId).subscribe(res => {
        console.log('Success getAllSolvent :');
        this.solventList = Constants.SOLVENT_LIST;
      }, err => {
        console.log('Error getAllSolvent list : ');
        this.solventList = Constants.SOLVENT_LIST;
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

  setSelectedSubAnalysis(subAnalysisName) {
    const selectedSubAnalysis = this.subAnalysisList.filter(function (subAnalysis) {
      return subAnalysis.subAnalysisname === subAnalysisName;
    });
    if (selectedSubAnalysis.length === 1) {
      this.model.subid = selectedSubAnalysis[0].subid;
      this.getRateObject();
    }
  }

  clearFieldsExceptAnalysis() {
    this.model = new TaborderModel();
    this.rateObject = new RateModel();
    this.selectedSubAnalysisName = '';
    this.selectedSolventName = '';
    this.selctedNumberOfSamples = 1;
    this.solventRate = 0;
  }

  getRateObject() {
    const body = {
      subid: this.model.subid,
      utid: this.model.uid,
    };
    this.userService.getRateBySubanalysisId(body).subscribe(res => {
        console.log('Success getAllSolvent :');
        this.rateObject = Constants.RATE_OBJECT;
      }, err => {
        console.log('Error getAllSolvent list : ');
        this.rateObject = Constants.RATE_OBJECT;
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
