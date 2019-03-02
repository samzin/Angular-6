export class TaborderModel {
  userType: String;
  aid: Number;
  solventname: String;
  analysisname: String;
  sub_Analysisname: String;
  rate: String;
  hrs_Rate: String;
  sampleLimit: Number;
  sampleNames: String;

  constructor() {
    this.userType = 'Select User Type';
    this.aid = 0;
    this.solventname = '';
    this.analysisname = '';
    this.sub_Analysisname = '';
    this.rate = '';
    this.hrs_Rate = '';
    this.sampleLimit = 1;
    this.sampleNames = '';
  }
}
