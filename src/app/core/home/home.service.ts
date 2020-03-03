import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { IEmployee } from '@empInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  hotelUrl = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json';
  empData$ = this.http.get<IEmployee []> (this.hotelUrl).pipe(
             tap(data => console.log({data})),
             shareReplay(1),
             catchError(this.errorhandler));

  constructor(private http: HttpClient) { }

  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
