import {AnalysisModel} from './analysis.model';

export class OperatorAdminModel {

  aid: AnalysisModel;
  contactNumber: number;
  email: string;
  fullName: string;
  password: string;
  role: number;

  constructor() {
    this.aid = new AnalysisModel();
  }
}
