export class Constants {
  public static USER_TYPES: string[] = ['Campus', 'Colleges', 'Govt.', 'Industry', 'Other University'];

  public static USER_TYPE_OBJECTS: any[] = [
    {
      'userTypeName': 'Campus',
      'userTypeId': 1
    },
    {
      'userTypeName': 'Colleges',
      'userTypeId': 2
    },
    {
      'userTypeName': 'Govt.',
      'userTypeId': 3
    }
  ];

  public static ANALYSIS_LIST: any [] = [
    {
      'aid': 0,
      'analysisname': 'A'
    },
    {
      'aid': 1,
      'analysisname': 'B'
    },
    {
      'aid': 2,
      'analysisname': 'C'
    },
    {
      'aid': 3,
      'analysisname': 'D'
    },
    {
      'aid': 4,
      'analysisname': 'E'
    }
  ];

  public static SOLVENT_LIST: any[] = [
    {
      'aid': 1,
      'rate': 12,
      'solid': 123,
      'solventname': 'Solvent-A'
    },
    {
      'aid': 2,
      'rate': 20,
      'solid': 40,
      'solventname': 'Solvent-B'
    },
    {
      'aid': 3,
      'rate': 40,
      'solid': 20,
      'solventname': 'Solvent-C'
    },
    {
      'aid': 4,
      'rate': 50,
      'solid': 50,
      'solventname': 'Solvent-D'
    }
  ];

  public static SUBANALYSIS: any[] = [
    {
      'aid': 1,
      'sub_Analysisname': 'Sub A',
      'subid': 1
    },
    {
      'aid': 2,
      'sub_Analysisname': 'Sub B',
      'subid': 2
    },
    {
      'aid': 3,
      'sub_Analysisname': 'Sub C',
      'subid': 3
    },
    {
      'aid': 4,
      'sub_Analysisname': 'Sub D',
      'subid': 4
    },
    {
      'aid': 5,
      'sub_Analysisname': 'Sub E',
      'subid': 5
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
      'aid': 1,
      'sub_Analysisname': 'Sub A',
      'subid': 1
    },
    {
      'aid': 2,
      'sub_Analysisname': 'Sub B',
      'subid': 2
    },
    {
      'aid': 3,
      'sub_Analysisname': 'Sub C',
      'subid': 3
    },
    {
      'aid': 4,
      'sub_Analysisname': 'Sub D',
      'subid': 4
    },
    {
      'aid': 5,
      'sub_Analysisname': 'Sub E',
      'subid': 5
    }
  ];

}

export class LocalStorage {
  public static ANALYSIS_ID: 'analysis_id';
}
export class API {
  public static USER_TAB_ORDER = '/cif/userorder/$analysisId$/taborder';
}
