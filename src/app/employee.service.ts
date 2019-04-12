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
