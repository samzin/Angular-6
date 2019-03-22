import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TaborderModel} from '../../../shared/models/taborder.model';
import {APIResponse, CIFConstants, Constants, Validation} from '../../../shared/Constants';
import {UserService} from '../../../shared/user.service';
import {AppLoaderService} from '../../../common-services/app-loader.service';
import {ToasterNotificationService} from '../../../common-services/toaster-notification.service';
import {AnalysisModel} from '../../../shared/models/analysis.model';
import {SubanalysisModel} from '../../../shared/models/subanalysis.model';
import {SolventModel} from '../../../shared/models/solvent-model';

@Component({
  selector: 'app-analysis-order-form',
  templateUrl: 'analysis-order-form.component.html',
  styleUrls: []
})

export class AnalysisOrderFormComponent implements OnInit, OnChanges {

  @Input() formType: string;
  @Input() orderModel?: TaborderModel = new TaborderModel();
  @Output() submitEvent = new EventEmitter<any>();

  analysisList = [];
  subAnalysisList = [];
  solventList = [];
  sampleCodesList = [];
  selctedNumberOfSamples = 0;
  showSampleLimitErrorMessage = false;
  numberOfSamples = Array(100).fill(null).map( (x, i) => i = i + 1 );
  addSampleCodePlaceholder = 'Add Sample Codes';
  solventProviderList = Constants.SOLVENT_PROVIDER_LIST;
  sampleLimitErrorMessage = Validation.ERROR_SAMPLE_CODE_VALIDATION;

  userId = parseInt(localStorage.getItem('user_id'), 0);
  userTypeId = parseInt(localStorage.getItem('user_type_id'), 0);

  constructor(private userService: UserService, private appLoader: AppLoaderService,
              private toasterNotification: ToasterNotificationService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.orderModel) {
      /*this.orderModel = changes.orderModel.currentValue;*/
      this.getAllAnalysis();
      this.setSampleCodes();
    }
  }

  setSampleCodes() {
    this.sampleCodesList = this.orderModel.sample_Code.split(',');
    this.selctedNumberOfSamples = this.sampleCodesList.length;
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
    if (this.formType === 'Edit') {
      console.log('Getting subanalysis for ' + this.orderModel.aid.analysisname);
      this.changeAnalysis(this.orderModel.aid);
    }
  }

  errorGetAnalysisName(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ANALYSIS_LIST);
  }

  changeAnalysis(analysisId: AnalysisModel) {
    const selectedAnalysis = this.analysisList.filter(function (analysis) {
      return analysis.aid === analysisId.aid;
    });
    if (selectedAnalysis.length > 0) {
      this.orderModel.aid.analysisname = selectedAnalysis[0].analysisname;
      this.getAllSubAnalysis();
      if (this.orderModel.aid.analysisname === CIFConstants.ANALYSIS_NAME_FOR_SOLVENT) {
        this.getAllSolvents();
      }
    }
  }

  getAllSolvents() {
    this.startLoader();
    const analysisId = this.orderModel.aid.aid;
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

  changeSolvent(solvent: SolventModel) {
    const selectedSolventname = this.solventList.filter(function (solvnt) {
      return solvnt.solventname === solvent.solventname;
    });
    if (selectedSolventname.length === 1) {
      this.orderModel.solvent_id = selectedSolventname[0];
      this.orderModel.solvent_Rate = this.orderModel.solvent_id.rate;
    }
  }

  getAllSubAnalysis() {
    this.startLoader();
    const body = {
      aid : this.orderModel.aid.aid
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
    if (this.formType === 'Edit') {
      this.getRateObject();
    }
  }

  changeSubanalysis(subAnalysis: SubanalysisModel) {
    const selectedSubAnalysis = this.subAnalysisList.filter(function (subanalysis) {
      return subanalysis.subid === subAnalysis.subid;
    });
    if (selectedSubAnalysis.length > 0) {
      this.orderModel.subid.sub_Analysisname = selectedSubAnalysis[0].sub_Analysisname;
      this.getRateObject();
    }
  }

  getRateObject() {
    if (this.orderModel.subid.subid && this.userTypeId) {
      const body = {
        subid: this.orderModel.subid.subid,
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
  }

  successGetRateObject(response) {
    this.stopLoader();
    this.orderModel.rate = response.rate;
    this.orderModel.hrs_Rate = response.hrs_Rate;
  }

  errorGetRateObject(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_RATE_FOR_ANALYSIS);
  }

  onSubmit(tabOrder) {
    const sample_code_string = tabOrder.sample_Code;
    let new_sample_code = '';
    if (sample_code_string.endsWith(',')) {
      new_sample_code = sample_code_string.slice(0, sample_code_string.length - 1);
    }
    tabOrder.sample_Code = new_sample_code;
    this.submitEvent.emit(tabOrder);
  }

  disableSolventProvider() {
    if (this.userTypeId === CIFConstants.USER_TYPE_ID) {
      if (this.orderModel.aid.aid === CIFConstants.SHOW_SOLVENT_FOR_ANALYSIS_ID) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  disableSolvent() {
    if (this.orderModel.aid.aid === CIFConstants.SHOW_SOLVENT_FOR_ANALYSIS_ID) {
      if (this.orderModel.solvent_provider === 'Provided by User') {
        // clear solvent name, solvent rate, subanalysis
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  showInHouseExpert() {
    if (this.orderModel.aid.aid === CIFConstants.SHOW_INHOUSE_EXPERT_FOR_ANALYSIS_ID) {
        return true;
    } else {
      return false;
    }
  }

  showLiquidNitrogen() {
    if (this.orderModel.aid.aid === CIFConstants.SHOW_LIQUID_NITROGEN_FOR_ANALYSIS_ID) {
      return true;
    } else {
      return false;
    }
  }

  onItemAdded(tag) {
    if (tag.value) {
      this.orderModel.sample_Code = this.orderModel.sample_Code + tag.value + ',';
    }
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}

