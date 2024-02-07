import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookDataSource, BookDetails, GetBookRequest } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient) { }

  getBooks(params: GetBookRequest): Observable<any> {
    let queryParams = new HttpParams({
      fromObject: params as any
    })
    return this._http.get(`${environment.baseURL}/books`, { params: queryParams });
  }

  addBook(params: BookDataSource): Observable<any> {
    return this._http.post(`${environment.baseURL}/book`, params);
  }

  updateBookDetails(id: number, params: BookDetails): Observable<any> {
    return this._http.patch(`${environment.baseURL}/book/${id}`, params);
  }

  getBookDetailsById(id: number): Observable<any> {
    return this._http.get(`${environment.baseURL}/book/${id}`);
  }

  deleteBookDetailsById(id: number): Observable<any> {
    return this._http.delete(`${environment.baseURL}/book/${id}`);
  }
}
