import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MaterialFirebaseService {
  authState$ = this.angularFireAuth.authState;
  a = this.af;
  angularFirestore: AngularFirestoreCollection<any>  = this.afs.collection<any>('users') ;
  constructor(private angularFireAuth : AngularFireAuth, private af: AngularFireDatabase,
              private afs: AngularFirestore) {
    //this.af.database.ref('/orders').push( JSON.parse ( JSON.stringify( {order: '1'})))
   // this.a.list('/orders').snapshotChanges().pipe(
     // map( action => action.map(ab=> ({$key: ab.key, ...ab.payload.val() as object })  ) )
    //)
  }

  createNewUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then (res => resolve(res) , err => reject(err)) ;
    });
  }

  login(email: string, password: string) {
    
   return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }
}
