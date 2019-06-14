import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from './iemployee';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, throttleTime, distinctUntilChanged, first, switchMap   } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { DataModel } from './material-contact/datamodel';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
user: User;
isLogedIn: boolean;
  private url_MaterialFormSave = 'https://chatnodejsappdemo.herokuapp.com/enroll';

  //private url = 'http://localhost:3000';
  private url = 'https://chatnodejsappdemo.herokuapp.com/';
  private socket;

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth) {
      this.socket = io(this.url);
  //  FireBase Default authentication ..
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          this.isLogedIn = true;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          this.isLogedIn = false;
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
  }
    // Firebase Authentication..
  async login(email: string, password: string) {
    const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then( result => true)
    .catch(( result ) => {
      window.alert(result.message);
      console.log('error msg: ', result);
    });
    //console.log('Result: ', result);
  }
  isloggedInMethod() {
    //console.log('isLogedIn :',this.angularFireAuth.authState.pipe( first() ).toPromise());
    //return this.angularFireAuth.authState.pipe( first() ).toPromise();
   /* return this.angularFireAuth.authState.pipe(
        switchMap( user => user ? 'online' : 'offLine' ),
    ); */
     this.angularFireAuth.authState.subscribe (user => {
          if(user){ this.isLogedIn = true;}
          else{ this.isLogedIn = false;}
    });
    console.log(this.isLogedIn);
    return this.isLogedIn;
  }
  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async logout() {
    const result = await this.angularFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
    }).catch( (err) => {
      window.alert(err.message);
    });
  }

  // Scoket.io Chatting..

  public sendMessage(message: string, userName: string) {
    this.socket.emit('new-message', message, userName );
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', ( data, username ) => {
            observer.next(data, username);
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
userIsTyping (userName: string) {
    this.socket.emit('typing', userName  );
}
 
getUserisTyping  = () =>{
  return Observable.create( (observer) =>{
    this.socket.on('typing' , (usertyping) =>{
      observer.next(usertyping);
    });
  } );
}
timeout() {
  this.socket.emit('typing', false);
  console.log('timeOUt call');
}

onSubmit(datamodel: DataModel) {
 return this.http.post<any> (this.url_MaterialFormSave, datamodel);
}

// get userdata using HttpClient in json format..

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
