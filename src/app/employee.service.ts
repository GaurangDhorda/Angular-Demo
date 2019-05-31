import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from './iemployee';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, throttleTime, distinctUntilChanged   } from 'rxjs/operators';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //private url = 'http://localhost:3000';
  private url= 'https://chatnodejsappdemo.herokuapp.com/';
  private socket;    

  constructor(private http: HttpClient) {this.socket = io(this.url); }
  
  public sendMessage(message: string) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
}
public getTotalUser = () => {
    return Observable.create((observer) => {
            this.socket.on('totalUsers', (totalUsers) => {
            observer.next(totalUsers);
  });
 });

}

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
