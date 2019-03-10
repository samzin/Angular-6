import {UserTypeModel} from './userType.model';

export class UserModel {
  uid: Number;
  address: string;
  contact: string;
  deptName: string;
  emailId: string;
  gstIn: string;
  guideEmailId: string;
  guideName: string;
  instName: string;
  stateCode: string;
  userName: string;
  userType: UserTypeModel;

  constructor() {
  }
}
