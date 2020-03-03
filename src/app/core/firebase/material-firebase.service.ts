import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MaterialFirebaseService {
  authState$ = this.angularFireAuth.authState;
  constructor(private angularFireAuth : AngularFireAuth) {
  }
  createNewUser(email: string, password: string) { 
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then (res => resolve(res) , err => reject(err)) ;
    });
  }

  login(email: string, password : string){
   return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout(){
    return this.angularFireAuth.auth.signOut();
  }
}
