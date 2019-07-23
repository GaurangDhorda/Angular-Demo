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
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
user: User;
isLogedIn: boolean;
dataModel: DataModel;
public editDataTitle = '';
  private url_MaterialFormSave = 'https://chatnodejsappdemo.herokuapp.com/enroll';
  // 'http://localhost:3000/enroll'
  private url_MaterialFormRead = 'https://chatnodejsappdemo.herokuapp.com/materialContactRead';
  // 'http://localhost:3000/materialContactRead';
  private url_MaterialFormEdit = 'https://chatnodejsappdemo.herokuapp.com/editt';     // 'http://localhost:3000/editt';
  private url_MaterialFormDelete = 'https://chatnodejsappdemo.herokuapp.com/deleteEmployee';

  //private url = 'http://localhost:3000';
  private url = 'https://chatnodejsappdemo.herokuapp.com/';
  private socket;

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth, private snackbar: MatSnackBar) {
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
    createNewUser(email: string, password: string) {

      return new Promise<any>((resolve, reject) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then (res => resolve(res) , err => reject(err)) ;
      });
  
    }

  async login(email: string, password: string) {
    const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then( successVal => { return email })
    .catch(( err ) => {
      let snack = this.snackbar.open(err.message , 'OK');
      snack.onAction().subscribe( () => {
        window.location.reload();
      });
     // console.log('error msg: ', result);
    });
    return result;
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

public getUsers(): Observable<any> {
  let getUsersCount = 0;
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

// material contact form methods

onSubmit(datamodel: DataModel) {
 return this.http.post<any> (this.url_MaterialFormSave, datamodel);
}

onRead() {
  return this.http.get<any> (this.url_MaterialFormRead).pipe(
    tap(data => console.log('node data ' + data)),
    catchError(this.errorhandler)
  );
}
getEditData() {
  return this.dataModel;
}
setEditData(data: any) {
 this.dataModel = data;
  console.log(this.dataModel);
}
fileUpload(path: FormData) {
  console.log('jsonData' + path);
  // console.log( JSON.stringify(path.get('image')));
  return this.http.post <any> ('http://chatnodejsappdemo.herokuapp.com/fileUpload' , path);
}
onContactEdit(dataModel: DataModel) {
  console.log(' data model api '+ dataModel.key);
  return this.http.post<DataModel> (this.url_MaterialFormEdit, dataModel);
}
onContactDelete(key ) {
  console.log('key ' + key);
  return this.http.post <any> (this.url_MaterialFormDelete, key);
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
