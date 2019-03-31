import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIResponse, Constants} from '../../shared/Constants';
import {UserService} from '../../shared/user.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {OperatorAdminModel} from '../../shared/models/OperatorAdminModel';
import {AdminService} from '../admin.service';
declare let $: any;

@Component({
  selector: 'app-create-operator',
  templateUrl: './create-operator.component.html',
  styleUrls: ['./create-operator.component.css']
})
export class CreateOperatorComponent implements OnInit {

  @Output() refreshList = new EventEmitter<any>();
  analysisList = [];
  operatorRoles = Constants.OPERATOR_ROLES;
  operatorModel = new OperatorAdminModel();

  constructor(private formBuilder: FormBuilder, private userService: UserService, private adminService: AdminService,
              private appLoader: AppLoaderService, private toasterNotification: ToasterNotificationService) { }

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
  }

  errorGetAnalysisName(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ANALYSIS_LIST);
  }

  onSubmit(operatorMModel) {
    this.appLoader.start();
    if (operatorMModel) {
      this.adminService.createOperator(operatorMModel).subscribe(
        response => {
          this.successCreateOperator();
        }, error => {
          this.errorCreateOperator();
        }
      );
    }
  }

  successCreateOperator() {
    this.appLoader.stop();
    this.operatorModel = new OperatorAdminModel();
    $('#createOperator').modal('hide');
    this.refreshList.emit();
    this.toasterNotification.showSuccess('Successfully created Admin/Operator');
  }

  errorCreateOperator() {
    this.appLoader.stop();
    this.toasterNotification.showError('Error creating Admin/Operator');
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}
