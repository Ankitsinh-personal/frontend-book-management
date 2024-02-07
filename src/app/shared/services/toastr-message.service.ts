import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrMessageService {

  constructor(private _toastr: ToastrService) { }

  showSuccess(message: string) {
    this._toastr.success(message);
  }

  showError(message: string) {
    this._toastr.error(message);
  }
}
