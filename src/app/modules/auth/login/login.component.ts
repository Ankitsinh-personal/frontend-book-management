import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Message } from 'src/app/shared/enums/messages.enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrMessageService } from 'src/app/shared/services/toastr-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  messages = Message;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _toastrMessageService: ToastrMessageService) { }

  ngOnInit(): void {

    if (localStorage.getItem('accessToken')) {
      this._router.navigate(['/books/list'])
    }

    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this._authService.login(this.loginForm.value).subscribe((res) => {
      localStorage.setItem('accessToken', res.accessToken)
      this._toastrMessageService.showSuccess(res?.message);
      this._router.navigate(['/books/list'])
    }, (error: HttpErrorResponse) => {
      this._toastrMessageService.showError(error.error?.message)
    })
  }
}
