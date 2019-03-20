export class UserTypeModel {
  userTypeId: Number;
  userTypeName: String;

  constructor() {
    this.userTypeId = parseInt(localStorage.getItem('user_type_id'), 0);
  }
}
