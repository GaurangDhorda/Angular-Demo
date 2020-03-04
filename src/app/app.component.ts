import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd, Event, NavigationStart, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MapserviceService } from '@map/mapservice.service';

declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  public isWaiting: boolean;
  message: string ='';
  public name: string;
  constructor(private mapService: MapserviceService, private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar, private swPush: SwPush) {
    // Google Analytics ... 
    const navEndEvents = this.router.events.pipe(
      filter (events =>  events instanceof NavigationEnd),
    );

    navEndEvents.subscribe( (event: NavigationEnd ) => {
      gtag('config', 'UA-143173960-1' , {
        // this gtag is generated by Google Ananlytics refere index.html file..
        'page_path': event.urlAfterRedirects
      } );
    } );
  }

  ngOnInit() {
   // navigator.serviceWorker.register('/Angular-Demo/ngsw-worker.js');
      this.router.events.subscribe(   (event: Event) => {
            this.checkEvent(event);
      });
      this.subscription = this.mapService.getCurrentLocation().subscribe(location => {
        /*  this.snackbar.open(location.currentLat + ' and ' + location.currentLng, '', {
          duration: 3000
        }); */
      }, err => { this.snackbar.open(err, '', {duration: 3000})},
         () => console.log('locatoin received')
      );
  }
  onActivate(componentReference) {
    this.name = componentReference.title;
  }
  // loading spinner for Lazy loading mudle..
  checkEvent(event: Event) {
    if (event instanceof NavigationStart) {
      this.isWaiting = true;
    }
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.isWaiting = false;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
