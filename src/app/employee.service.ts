import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from './iemployee';
import { Observable, throwError } from 'rxjs';
import { catchError, tap  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get <IEmployee []>  ('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json' )
    .pipe(
      /* in RxJS6 some changes in operator are .. 
          To avoid the conflict with JavaScript keyword, some RxJS operators name has been changed such as 
          do changed to tap, catch changed to catchError, switch changed to switchAll and finally changed to finalize.
          These operators are imported from rxjs/operators.
      */
        tap( data => console.log('Server data', data)),
        catchError(this.errorhandler)
    );
  }

  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
  getEmployeeById(){

  }
}
