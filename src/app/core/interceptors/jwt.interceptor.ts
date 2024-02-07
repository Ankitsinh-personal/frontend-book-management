import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    let token: string
    if (localStorage.getItem('accessToken')) {
      token = JSON.parse(JSON.stringify(localStorage.getItem('accessToken')));
      if (token) {
        request = request.clone({
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        });
      }
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Handle successful response
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._authService.logout();
          this._router.navigate(['/']);
        }
        return throwError(error)
      })
    );
  }
}
