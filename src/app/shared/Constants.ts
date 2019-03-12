export class Constants {

  public static USER_TYPE_CAMPUS = 'SPPU-Campus';
  public static USER_TYPE_COLLEGE = 'SPPU-Colleges';
  public static USER_TYPE_GOVERNAMENT = 'Govt.';
  public static USER_TYPE_INDUSTRY = 'Industry';
  public static USER_TYPE_UNIVERSITY = 'Other University';

  public static PAYMENT_TYPES: string[] = [ 'By Challan', 'By Cheque', 'By DD', 'By Budget Head'];

  public static USER_TYPE_OBJECTS: any[] = [
    {
      'userTypeId': 1,
      'userTypeName': 'SPPU-Campus'
    },
    {
      'userTypeId': 2,
      'userTypeName': 'SPPU-Colleges'
    },
    {
      'userTypeId': 3,
      'userTypeName': 'Govt.'
    },
    {
      'userTypeId': 4,
      'userTypeName': 'Industry'
    },
    {
      'userTypeId': 5,
      'userTypeName': 'Other University'
    }
  ];

  public static ORDERS_HISTORY: any[] = [
    {
      'ordid_tot': '1',
      'order_date': '2018-07-29',
      'bill_no': 'AVDC4533',
      'total_amount': '23470',
      'wallet_used': '23470',
    },
    {
      'ordid_tot': '2',
      'order_date': '2018-08-1',
      'bill_no': 'AVDC4566',
      'total_amount': '22370',
      'wallet_used': '23470'
    },
    {
      'ordid_tot': '3',
      'order_date': '2018-09-2',
      'bill_no': 'AVDC4522',
      'total_amount': '23470',
      'wallet_used': '23470',
    },
    {
      'ordid_tot': '4',
      'order_date': '2018-10-3',
      'bill_no': 'AVDC4511',
      'total_amount': '23450',
      'wallet_used': '23230'
    }
  ];

  public static SOLVENT_PROVIDER_LIST: any[] = [
    {
      'uid': 1,
      'providername': 'Provided by User'
    },
    {
      'uid': 2,
      'providername': 'Provided by CIF'
    }
  ];

  public static PAYMENT_TYPE_BY_CHEQUE = 'By Cheque';
  public static PAYMENT_TYPE_BY_DD = 'By DD';
  public static PAYMENT_TYPE_CHALLAN = 'By Challan';
  public static PAYMENT_TYPE_BUDGET_HEAD = 'By Budget Head';

}

export class Validation {
  public static ERROR_SAMPLE_CODE_VALIDATION = 'Please Enter no sample names equal to No. of samples Selected.';
}

export class CIFConstants {
  public static APP_NAME = 'Central Instrumentation Facility';
  public static ANALYSIS_NAME_FOR_SOLVENT = 'NMR 500 MHz';
  public static ANALYSIS_NAME_FOR_INHOUSE_EXPERT = 'Confocal Microscope';
  public static ANALYSIS_NAME_WITH_SINGLE_CRYSTAL = 'Single Crystal XRD';
  public static USER_TYPE_ID = 1;
  public static ORDER_ID = 'Order Id';
  public static ORDER_INDEX = 'Index';
  public static ANALYSIS_NAME = 'Analysis Name';
  public static SUB_ANALYSIS_NAME = 'Sub Analysis Name';
  public static SOLVENT_NAME = 'Solvent Name';
  public static SAMPLE_CODE = 'Sample Code';
  public static RATE = 'Rate';
  public static RATE_PER_HOUR = 'Rate/Hr';
  public static EXTRA_HRS = 'Extra Hrs.';
  public static TAXABLE_AMOUNT = 'Tax. Amt.';
  public static CGST = 'CGST';
  public static CGSTP = 'CGSTP';
  public static SGST = 'SGST';
  public static SGSTP = 'SGSTP';
  public static AMOUNT = 'Amt.';
  public static DATE = 'Date';
  public static ACTION = 'Action';
}

export class LocalStorageLabels {
  public static ANALYSIS_ID: 'analysis_id';
  public static USER_ID: 'user_id';
  public static USER_TYPE_ID: 'user_type_id';
}

export class API {
  public static USER_TAB_ORDER = '/userorder/$analysisId$/taborder';
  public static USER_TAB_ORDER_LIST = '/userorder/$bill$/taborder';
  public static ANALYSIS_LIST = '/userorder/analysis';
  public static SUB_ANALYSIS_LIST = '/userorder/$analysisId$/subanalysis';
  public static SOLVENT_LIST = '/userorder/$analysisId$/solvents';
  public static RATE = '/userorder/rate';
  public static DELETE_ORDER = '/userorder/$bill$/$index$';
  public static CONFIRM_ORDER = '/userorder/$bill$/confirm';
  public static PAY_BY_WALLET = '/wallet/$uid$';
  public static USER_PROFILE_DETAILS = '/authentication/$uid$/userprofile';
  public static UPDATE_USER_PROFILE = '/authentication/$uid$/userprofile';
}

export class APIResponse {
  public static ERROR_LOGIN = 'Error while login.';
  public static SUCCESS_GETTING_ORDERS = 'Successfully fetched orders list.';
  public static ERROR_GETTING_ORDERS = 'Error fetching orders list.';
  public static SUCCESS_DELETING_ORDERS = 'Successfully deleted Order.';
  public static ERROR_DELETING_ORDERS = 'Error deleting Order.';
  public static SUCCESS_CONFIRM_ORDERS = 'Order confirmed. Please Proceed to checkout.';
  public static ERROR_CONFIRM_ORDERS = 'Unable to confirm Order.';
  public static SUCCESS_CREATING_ORDER = 'Successfully created order.';
  public static ERROR_CREATING_ORDER = 'Error while created order.';
  public static SUCCESS_PAY_BY_WALLET = 'Paid by wallet successfully.';
  public static ERROR_PAY_BY_WALLET = 'Error while making payment by wallet.';
  public static ERROR_GETTING_ANALYSIS_LIST = 'Error fetching all Analysis.';
  public static ERROR_GETTING_SUB_ANALYSIS_LIST = 'Error fetching all Sub Analysis.';
  public static ERROR_GETTING_SOLVENTS_LIST = 'Error fetching all Solvents.';
  public static ERROR_GETTING_RATE_FOR_ANALYSIS = 'Error fetching rates for selected Analysis.';
  public static SUCCESS_GETTING_PROFILE_DETAILS = 'Successfully fetched User Details.';
  public static ERROR_GETTING_PROFILE_DETAILS = 'Error while fetching user details.';
  public static SUCCESS_UPDATE_PROFILE_DETAILS = 'Successfully updated User Details.';
  public static ERROR_UPDATE_PROFILE_DETAILS = 'Error updating user details.';
}
