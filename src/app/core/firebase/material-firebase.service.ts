import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialFirebaseService {
  authState$ = this.angularFireAuth.authState;
  a = this.af;
  constructor(private angularFireAuth : AngularFireAuth, private af: AngularFireDatabase) {
    //this.af.database.ref('/orders').push( JSON.parse ( JSON.stringify( {order: '1'})))
   // this.a.list('/orders').snapshotChanges().pipe(
     // map( action => action.map(ab=> ({$key: ab.key, ...ab.payload.val() as object })  ) )
    //)
  }

  createNewUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then (res => resolve(res) , err => reject(err)) ;
    });
  }

  login(email: string, password: string) {
   return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }
}
