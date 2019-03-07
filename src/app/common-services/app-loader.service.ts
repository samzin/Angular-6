import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppLoaderService {

  constructor(private ngxService: NgxUiLoaderService) {
  }

  start() {
    this.ngxService.start();
  }

  stop() {
    this.ngxService.stop();
  }

}
