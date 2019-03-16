import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {APIResponse, CIFConstants, Constants, LocalStorageLabels, Validation} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {RateModel} from '../../shared/models/rate.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {AnalysisModel} from '../../shared/models/analysis.model';
import {SubanalysisModel} from '../../shared/models/subanalysis.model';
declare let $: any;

@Component({
  selector: 'app-order-form',
  templateUrl: 'order-form.component.html'
})

export class OrderFormComponent implements OnInit, OnChanges {

  @Input() formType: String;
  @Input() model?: TaborderModel = new TaborderModel();
  @Output() submitEvent = new EventEmitter<any>();

  selectedAnalysisModel = new AnalysisModel();
  selectedSubAnalysisModel = new SubanalysisModel();
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
  public userId = parseInt(localStorage.getItem('user_id'), 0);
  public userTypeId = parseInt(localStorage.getItem('user_type_id'), 0);
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
    this.stopLoader();
    this.analysisList = response;
    if (this.model.aid) {
      this.getAnalysisName();
    }
  }

  errorGetAnalysisName(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ANALYSIS_LIST);
  }

  showSolventProvider() {
    if ( (this.userTypeId === 1 || this.userTypeId === 2) &&
      this.selectedAnalysisModel.analysisname === CIFConstants.ANALYSIS_NAME_FOR_SOLVENT) {
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
      this.selectedAnalysisModel = selectedAnalysisArray[0];
      this.selectedAnalysis(this.selectedAnalysisModel);
    }
  }

  selectedAnalysis(selectedAnalysis) {
    if (selectedAnalysis) {
      this.clearFieldsExceptAnalysis();
      this.model.aid = selectedAnalysis;
      this.getAllSubAnalysis();
      if (selectedAnalysis.analysisname === CIFConstants.ANALYSIS_NAME_FOR_SOLVENT) {
        this.getAllSolvents();
      }
    }
  }

  getAllSubAnalysis() {
    this.startLoader();
    const body = {
      aid : this.model.aid.aid
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
  }

  errorGetAllSubAnalysis() {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_SUB_ANALYSIS_LIST);
  }

  getAllSolvents() {
    this.startLoader();
    const analysisId = this.model.aid.aid;
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
  }

  errorGetAllSolvents(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_SOLVENTS_LIST);
  }

  setSelectedSolvent(selectedSolvent) {
    if (selectedSolvent) {
      this.solventRate = selectedSolvent.rate;
      this.model.solvent_Rate = selectedSolvent.rate;
      this.model.solvent_id = selectedSolvent;
    }
  }

  setSelectedSubAnalysis(selectedSubAnalysis) {
    if (selectedSubAnalysis) {
      this.model.subid = selectedSubAnalysis;
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
      subid: this.model.subid.subid,
      utid: this.userTypeId,
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
  }

  errorGetRateObject(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_RATE_FOR_ANALYSIS);
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
    this.startLoader();
    this.model.solvent_provider = this.providername;
    this.model.uid.uid = parseInt(localStorage.getItem('user_id'), 0);
    this.model.uid.userType.userTypeId = parseInt(localStorage.getItem('user_type_id'), 0);
    this.model.billNo = localStorage.getItem('bill_no');
    this.model.rate = this.rateObject.rate;
    this.model.hrs_Rate = this.rateObject.hrs_Rate;
    this.model.solvent_Rate = this.solventRate;
    this.userService.createUserTabOrder(this.model.aid.aid, this.model)
      .subscribe(
        response => {
          this.onSuccessOrder(response);
        }, error => {
          this.onErrorOrder(error);
        });
  }

  onSuccessOrder(response) {
    this.stopLoader();
    this.submitEvent.emit();
    $('#orderModal').modal('hide');
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
