export class PaymentModel {
  amount: number;
  paymentType: String;
  bankName: String;
  checkNumber: number;
  checkDate: Date;

  constructor() {
    this.amount = 0;
  }
}
