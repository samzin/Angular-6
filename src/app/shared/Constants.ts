export class Constants {
  public static USER_TYPES: string[] = ['Campus', 'Colleges', 'Govt.', 'Industry', 'Other University'];

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

  public static ANALYSIS_LIST: any [] = [
    {
      'aid': 1,
      'analysisname': 'NMR 500 MHz'
    },
    {
      'aid': 2,
      'analysisname': 'LC-MS/MS'
    },
    {
      'aid': 3,
      'analysisname': 'FESEM EDS'
    },
    {
      'aid': 4,
      'analysisname': 'Confocal Microscope'
    },
    {
      'aid': 5,
      'analysisname': 'CD Spectrophotometer'
    },
    {
      'aid': 6,
      'analysisname': 'Single Crystal XRD'
    },
    {
      'aid': 7,
      'analysisname': 'GC-MS-MS'
    }
  ];

  public static SOLVENT_LIST: any[] = [
    {
      'aid': 1,
      'rate': 150,
      'solid': 1,
      'solventname': 'D2O & DMSO-D6'
    },
    {
      'aid': 1,
      'rate': 300,
      'solid': 2,
      'solventname': 'Actone -D6'
    },
    {
      'aid': 1,
      'rate': 400,
      'solid': 3,
      'solventname': 'Benzene -D6'
    },
    {
      'aid': 1,
      'rate': 500,
      'solid': 4,
      'solventname': 'Methanol -D4'
    },
    {
      'aid': 1,
      'rate': 600,
      'solid': 5,
      'solventname': 'Acetonitrile -D3'
    },
    {
      'aid': 1,
      'rate': 0,
      'solid': 6,
      'solventname': 'CDCl3'
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

  public static SUBANALYSIS: any[] = [
    {
      'subid': 1,
      'subAnalysisname': 'HRMS(Small Molecules)Only Mass'
    },
    {
      'subid': 2,
      'subAnalysisname': 'HRMS(Small Molecules) Chromatogram'
    },
    {
      'subid': 3,
      'subAnalysisname': 'LC-MS(Small Molecules) Chromatogram(LC+MS)'
    },
    {
      'subid': 4,
      'subAnalysisname': 'HRMS/MS(Small Molecules) Chromatogram'
    },
    {
      'subid': 5,
      'subAnalysisname': 'LC-MS/MS(Small Molecules) Chromatogram'
    },
    {
      'subid': 6,
      'subAnalysisname': 'HRMS(Bio Molecules) Mass/Chromatogram'
    },
    {
      'subid': 7,
      'subAnalysisname': 'HRMS/MS (BioMolecules)* Identification'
    }
  ];

  public static RATE_OBJECT: any = {
    'hrs_Rate': '400',
    'rate': '5000',
    'rid': 0,
    'subid': 0,
    'utid': 0
  };

  public static ORDER_LIST: any[] =  [
    {
      'analysisname': 'LC-MS/MS',
      'sub_analysisname': 'HRMS(Small Molecules)Only Mass',
      'solventname': '',
      'samplecode': 'sg',
      'rate': '2000',
      'hrs_rate': '500',
      'extrahrs': '1',
      'taxableamt': '2500',
      'cgst': '225',
      'sgst': '225',
      'amount': '2950',
      'date': '2018-07-29',
      'orderid': '70'
    },
    {
      'analysisname': 'Confocal Microscope',
      'sub_analysisname': 'Confocal Microscope',
      'solventname': '',
      'samplecode': 'sg',
      'rate': '1000',
      'hrs_rate': '500',
      'extrahrs': '1',
      'taxableamt': '1500',
      'cgst': '125',
      'sgst': '125',
      'amount': '1950',
      'date': '2018-07-29',
      'orderid': '71'
    },
    {
      'analysisname': 'LC-MS/MS',
      'sub_analysisname': 'HRMS(Small Molecules)Only Mass',
      'solventname': '',
      'samplecode': 'h',
      'rate': '2000',
      'hrs_rate': '500',
      'extrahrs': '1',
      'taxableamt': '2500',
      'cgst': '225',
      'sgst': '225',
      'amount': '2950',
      'date': '2018-07-29',
      'orderid': '72'
    },
    {
      'analysisname': 'LC-MS/MS',
      'sub_analysisname': 'HRMS(Small Molecules)Only Mass',
      'solventname': '',
      'samplecode': 'd',
      'rate': '2000',
      'hrs_rate': '500',
      'extrahrs': '1',
      'taxableamt': '2500',
      'cgst': '225',
      'sgst': '225',
      'amount': '2950',
      'date': '2018-07-29',
      'orderid': '73'
    },
  ];

}

export class Validation {
  public static ERROR_SAMPLE_CODE_VALIDATION = 'Please Enter no sample names equal to No. of samples Selected.';
}

export class CIFConstants {
  public static APP_NAME = 'Central Instrumentation Facility';
  public static ANALYSIS_NAME_FOR_SOLVENT = 'NMR 500 MHz';
  public static USER_TYPE_ID = 1;
  public static ORDER_ID = 'Order Id';
  public static ANALYSIS_NAME = 'Analysis Name';
  public static SUB_ANALYSIS_NAME = 'Sub Analysis Name';
  public static SOLVENT_NAME = 'Solvent Name';
  public static SAMPLE_CODE = 'Sample Code';
  public static RATE = 'Rate';
  public static RATE_PER_HOUR = 'Rate/Hr';
  public static EXTRA_HRS = 'Extra Hrs.';
  public static TAXABLE_AMOUNT = 'Tax. Amt.';
  public static CGST = 'CGST';
  public static SGST = 'SGST';
  public static AMOUNT = 'Amt.';
  public static DATE = 'Date';
  public static ACTION = 'Action';
}

export class LocalStorage {
  public static ANALYSIS_ID: 'analysis_id';
}

export class API {
  public static USER_TAB_ORDER = '/userorder/$analysisId$/taborder';
  public static ANALYSIS_LIST = '/userorder/analysis';
  public static SUB_ANALYSIS_LIST = '/userorder/subanalysis';
  public static SOLVENT_LIST = '/userorder/$analysisId$/solvents';
  public static RATE = '/userorder/rate';
  public static DELETE_ORDER = '/userorder/$bill$/$index$';
}

export class APIResponse {
  public static ERROR_LOGIN = 'Error while login.';
  public static SUCCESS_GETTING_ORDERS = 'Successfully fetched orders list.';
  public static ERROR_GETTING_ORDERS = 'Error fetching orders list.';
  public static SUCCESS_DELETING_ORDERS = 'Successfully deleted Order.';
  public static ERROR_DELETING_ORDERS = 'Error deleting Order.';
  public static SUCCESS_CREATING_ORDER = 'Successfully created order.';
  public static ERROR_CREATING_ORDER = 'Error while created order.';
}
