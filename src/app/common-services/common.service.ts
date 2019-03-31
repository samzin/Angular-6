import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {

  CommonService = new BehaviorSubject<any>('null');
  updateOrderStatusInfo$ = this.CommonService.asObservable();

  change(values: any) {
    this.CommonService.next(values);
  }

  updateOrderStatusInfo(packageInfo: any) {
    if (packageInfo !== null) {
      this.CommonService.next(packageInfo);
    }
  }

}
