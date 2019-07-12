import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {
  currentLat;
  currentLng;
  private subject = new Subject<any>();

  constructor() { }

  getCurrentLocation(): Observable<any> {
    // get current location of user..();
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition( position => {
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
        // below line sends messages as subject Subcription..
        this.subject.next({ currentLat: this.currentLat, currentLng: this.currentLng });
      } );
     return this.subject.asObservable(); // getting messages as subject Subcription
     // using asObservable() prevents API data outside of calling..
     // after this new user is not able to use observer.next(), this throws error cause next not allowed here..
    }
  }
}
