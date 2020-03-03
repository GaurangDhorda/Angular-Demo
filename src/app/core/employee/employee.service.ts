import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, Subscription } from 'rxjs';
import { catchError, tap, throttleTime, distinctUntilChanged, first, switchMap, shareReplay, take   } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { User } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialFirebaseService } from '@material-firebase/material-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
user: User;
isLogedIn: boolean;


  //private url = 'http://localhost:3000';
  private url = 'https://chatnodejsappdemo.herokuapp.com/';
  private socket;

  constructor(private http: HttpClient, private snackbar: MatSnackBar,
              private firebaseService : MaterialFirebaseService) {
      this.socket = io(this.url);
  //  FireBase Default authentication ..
      this.firebaseService.authState$.subscribe(user => {
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
  
  isloggedInMethod() {
    //console.log('isLogedIn :',this.angularFireAuth.authState.pipe( first() ).toPromise());
    //return this.angularFireAuth.authState.pipe( first() ).toPromise();
   /* return this.angularFireAuth.authState.pipe(
        switchMap( user => user ? 'online' : 'offLine' ),
    ); */
     this.firebaseService.authState$.subscribe (user => {
          if(user){ this.isLogedIn = true;}
          else{ this.isLogedIn = false;}
    });
    return this.isLogedIn;
  }
  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async logout() {
    const result = await this.firebaseService.logout().then(() => {
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
          this.socket.on('new-message', ( data) => {
          console.log(JSON.stringify(data));
          console.log('user is ' + data.userName + ' and message is '+ data.messageData);
          observer.next(data);

        });
    });
}

public getUsers(): Observable<any> {
  this.socket.emit('getTotalUsers', '');
  return Observable.create ( (obr) => {
        this.socket.on('getTotalUsers', (users) => { obr.next(users); }
      )});
}

public getTotalUser(): Observable<any> {
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

postSubscriptions(sub: PushSubscription) {
    return this.http.post('https://chatnodejsappdemo.herokuapp.com/subscribe', sub).pipe(catchError(this.errorhandler));
}
// get userdata using HttpClient in json format..

  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
  getEmployeeById() {

  }
}
