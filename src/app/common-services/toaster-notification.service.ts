import { ToastrManager } from 'ng6-toastr-notifications';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToasterNotificationService {

  toasterPosition = 'bottom-right';

  constructor(public toastr: ToastrManager) {
  }

  showSuccess(message) {
    this.toastr.successToastr(message, 'Success!', {
      position: this.toasterPosition,
      showCloseButton: true
    });
  }

  showError(message) {
    this.toastr.errorToastr(message, 'Oops!', {
      position: this.toasterPosition,
      showCloseButton: true
    });
  }

  showWarning(message) {
    this.toastr.warningToastr(message, 'Alert!', {
      position: this.toasterPosition
    });
  }

  showInfo(message) {
    this.toastr.infoToastr(message, 'Info', {
      position: this.toasterPosition
    });
  }
}
