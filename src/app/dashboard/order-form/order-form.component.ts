import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {APIResponse, CIFConstants, Constants, Validation} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {RateModel} from '../../shared/models/rate.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';

@Component({
  selector: 'app-order-form',
  templateUrl: 'order-form.component.html'
})

export class OrderFormComponent implements OnInit, OnChanges {

  @Input() formType: String;
  @Input() model?: TaborderModel = new TaborderModel();

  selectedAnalysisName = '';
  selectedSubAnalysisName = '';
  providername = '';
  selectedSolventName = '';
  selctedNumberOfSamples = 1;
  solventRate = 0;

  public serverErrorMessages = false;
  public showSampleLimitErrorMessage = false;
  public analysisList = [];
  public solventList = [];
  public solventProviderList = Constants.SOLVENT_PROVIDER_LIST;
  public userId = parseInt(localStorage.getItem('user_id'));
  public userTypeId = parseInt(localStorage.getItem('user_type_id'));
  public subAnalysisList = [];
  public rateObject = new RateModel();

  public showSolventForAnalysis = CIFConstants.ANALYSIS_NAME_FOR_SOLVENT;
  public showInhouseExpert = CIFConstants.ANALYSIS_NAME_FOR_INHOUSE_EXPERT;
  public showLiquidNitrogen = CIFConstants.ANALYSIS_NAME_WITH_SINGLE_CRYSTAL;
  public showSolventByUserType = CIFConstants.USER_TYPE_ID;
  public sampleLimitErrorMessage = Validation.ERROR_SAMPLE_CODE_VALIDATION;
  public numberOfSamples = Array(100).fill(null).map( (x, i) => i = i + 1 );

  constructor(public userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.model) {
      this.getAllAnalysis();
    }
  }

  ngOnInit() {
    this.getAllAnalysis();
  }

  getAllAnalysis() {
    this.startLoader();
    this.userService.getAllAnalysisList().subscribe(res => {
        this.successGetAnalysisName(res);
      }, err => {
        this.errorGetAnalysisName(err);
      }
    );
  }

  successGetAnalysisName(response) {
    console.log('Success analysis list.');
    this.stopLoader();
    this.analysisList = response;
    // this.analysisList = Constants.ANALYSIS_LIST;
    if (this.model.aid) {
      this.getAnalysisName();
    }
  }

  errorGetAnalysisName(err) {
    console.log('Error analysis list.', JSON.stringify(err));
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ANALYSIS_LIST);
    // this.successGetAnalysisName(err);
  }

  showSolventProvider() {
    if ( (this.userTypeId === 1 || this.userTypeId === 2) &&
      this.selectedAnalysisName === CIFConstants.ANALYSIS_NAME_FOR_SOLVENT) {
      return true;
    } else {
      return false;
    }
  }

  disableSolvent() {
    if (this.providername === 'Provided by User') {
      return true;
    } else {
      return false;
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
    this.startLoader();
    const body = {
      aid : this.model.aid
    };
    this.userService.getAllSubAnalysisList(body).subscribe(res => {
        this.successGetAllSubAnalysis(res);
      }, err => {
        this.errorGetAllSubAnalysis();
      }
    );
  }

  successGetAllSubAnalysis(response) {
    this.stopLoader();
    this.subAnalysisList = response;
    // this.subAnalysisList = Constants.SUBANALYSIS;
  }

  errorGetAllSubAnalysis() {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_SUB_ANALYSIS_LIST);
    // this.subAnalysisList = Constants.SUBANALYSIS;
  }

  getAllSolvents() {
    this.startLoader();
    const analysisId = this.model.aid;
    this.userService.getAllSolventByAnalysisId(analysisId).subscribe(res => {
        this.successGetAllSolvents(res);
      }, err => {
        this.errorGetAllSolvents(err);
      }
    );
  }

  successGetAllSolvents(response) {
    this.stopLoader();
    this.solventList = response;
    // this.solventList = Constants.SOLVENT_LIST;
  }

  errorGetAllSolvents(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_SOLVENTS_LIST);
    // this.solventList = Constants.SOLVENT_LIST;
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
      return subAnalysis.sub_Analysisname === subAnalysisName;
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
    this.startLoader();
    this.userService.getRateBySubanalysisId(body).subscribe(res => {
        this.successGetRateObject(res);
      }, err => {
        this.errorGetRateObject(err);
      }
    );
  }

  successGetRateObject(response) {
    this.stopLoader();
    this.rateObject = response;
    // this.rateObject = Constants.RATE_OBJECT;
  }

  errorGetRateObject(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_RATE_FOR_ANALYSIS);
    // this.rateObject = Constants.RATE_OBJECT;
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
    this.startLoader();
    this.userService.createUserTabOrder(analysisId, tabOrder)
      .subscribe(
        response => {
          this.onSuccessOrder(response);
        }, error => {
          this.onErrorOrder(error);
        });
  }

  onSuccessOrder(response) {
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_CREATING_ORDER);
  }

  onErrorOrder(error) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_CREATING_ORDER);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}
