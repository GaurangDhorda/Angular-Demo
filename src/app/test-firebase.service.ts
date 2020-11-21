import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TestFirebaseService {
  a = this.angularFire.database;
  constructor(private angularFire: AngularFireDatabase) { }
  
}
