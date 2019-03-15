export class ConfirmOrderModel {

  balance: number;
  billNo: String;
  order_Date: Date;
  paid: number;
  stid: number;
  tab_orderId: number;
  total_Amount: number;
  uid: number;
  wallet_Used: number;
  state: number;

  constructor() {
    this.balance = 0;
    this.paid = 0;
    this.stid = 0;
    this.tab_orderId = 0;
    this.wallet_Used = 0;
    this.total_Amount = 0;
    this.order_Date = new Date();
  }
}

