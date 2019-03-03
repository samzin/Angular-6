export class TaborderModel {
  billNo: String;
  cgst: Number;
  cgstp: Number;
  extra_Hrs: Number;
  hrs_Rate: Number;
  order_Date: Date;
  ordid: Number;
  rate: Number;
  sample_Code: String;
  sgst: Number;
  sgstp: Number;
  solvent_Rate: Number;
  solvent_id: Number;
  state: Number;
  aid: Number;
  subid: Number;
  taxable_Amount: Number;
  total_Amount: Number;
  uid: Number;

  constructor() {
    this.billNo = '';
    this.cgst = 0;
    this.cgstp = 0;
    this.extra_Hrs = 0;
    this.hrs_Rate = 0;
    this.order_Date = new Date();
    this.ordid = 0;
    this.rate = 0;
    this.sample_Code = '';
    this.sgst = 0;
    this.sgstp = 0;
    this.solvent_Rate = 0;
    this.solvent_id = 0;
    this.state = 0;
    this.aid = 0;
    this.subid = 0;
    this.taxable_Amount = 0;
    this.total_Amount = 0;
    this.uid = 0;
  }
}
