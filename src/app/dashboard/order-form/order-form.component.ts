import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {APIResponse, CIFConstants, Constants, Validation} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {RateModel} from '../../shared/models/rate.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';

@Component({
  selector: 'app-order-form',
  templateUrl: 'order-form.component.html'
})

export class OrderFormComponent implements OnInit, OnChanges {

  @Input() formType: String;
  @Input() model?: TaborderModel = new TaborderModel();

  selectedAnalysisName = '';
  selectedSubAnalysisName = '';
  selectedSolventName = '';
  selctedNumberOfSamples = 1;
  solventRate = 0;

  public serverErrorMessages = false;
  public showSampleLimitErrorMessage = false;
  public analysisList = [];
  public solventList = [];
  public solventProviderList = Constants.SOLVENT_PROVIDER_LIST;
  public subAnalysisList = [];
  public rateObject = new RateModel();

  public showSolventForAnalysis = CIFConstants.ANALYSIS_NAME_FOR_SOLVENT;
  public showSolventByUserType = CIFConstants.USER_TYPE_ID;
  public sampleLimitErrorMessage = Validation.ERROR_SAMPLE_CODE_VALIDATION;
  public numberOfSamples = Array(100).fill(null).map( (x, i) => i = i + 1 );

  constructor(public userService: UserService, private toasterNotification: ToasterNotificationService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.model) {
      this.getAllAnalysis();
    }
  }

  ngOnInit() {
    this.getAllAnalysis();
  }

  getAllAnalysis() {
    this.userService.getAllAnalysisList().subscribe(res => {
        console.log('Success analysis list.');
        this.successGetAnalysisName();
      }, err => {
        this.successGetAnalysisName();
        console.log('Error analysis list.', JSON.stringify(err));
      }
    );
  }

  successGetAnalysisName() {
    this.analysisList = Constants.ANALYSIS_LIST;
    if (this.model.aid) {
      this.getAnalysisName();
    }
  }

  getAnalysisName() {
    const selectedAnalysisId = this.model.aid;
    const selectedAnalysisArray = this.analysisList.filter(function (analysis) {
      return analysis.aid === selectedAnalysisId;
    });
    if (selectedAnalysisArray.length === 1) {
      this.selectedAnalysisName = selectedAnalysisArray[0].analysisname;
      this.selectedAnalysis(this.selectedAnalysisName);
    }
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

  checkLimitForSamples(sampleCode) {
    const sampleSplit = sampleCode.split(',');
    let sampleSplitLength = sampleSplit.length;
    if (sampleSplit.includes('')) {
      sampleSplitLength = sampleSplitLength - 1;
    }
    if (this.selctedNumberOfSamples < sampleSplitLength) {
      this.showSampleLimitErrorMessage = true;
    } else {
      this.showSampleLimitErrorMessage = false;
    }
  }

  onSubmit(tabOrder: TaborderModel) {
    console.log('tabOrder : ' + JSON.stringify(tabOrder));
    const analysisId = 1;
    this.userService.createUserTabOrder(analysisId, tabOrder)
      .subscribe(
        response => {
          this.onSuccessOrder(response);
        }, error => {
          this.onErrorOrder(error);
        });
  }

  onSuccessOrder(response) {
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_CREATING_ORDER);
  }

  onErrorOrder(error) {
    this.toasterNotification.showError(APIResponse.ERROR_CREATING_ORDER);
  }

}
