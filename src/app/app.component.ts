import { Component } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message: string ='';
  constructor( ) {
    
  }
  ngOnInit() {
   // navigator.serviceWorker.register('/Angular-Demo/ngsw-worker.js');
    
  }
  onActivate(componentReference) {
  }
}
