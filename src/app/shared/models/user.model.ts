import {UserTypeModel} from './userType.model';

export class UserModel {
  uid: Number;
  firstName: Number;
  lastName: Number;
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
  password: string;
  userType: UserTypeModel;

  constructor() {
  }
}