import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeWhile, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '@home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public title = 'Home';
  public Employee = [];
  public errorMessage: string;
  public sub: Subscription;
  public alive: boolean;
  public imageSrc: string;
  public currentID: number;
  public first: boolean;
  public last: boolean;
  public isWait: boolean;
  infoWindowOpened = null ;
  previous_info_window = null;
  public currentLat;
  public currentLng;
  enableKeyDetection: boolean = false;
  empHomeService$ = this.empServiceData.empData$.pipe( takeWhile( () => this.alive),shareReplay(1));
  
  constructor(private empServiceData: HomeService, private router: Router,
              private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {
    this.alive = true;
  }

  ngOnInit() {
    this.isWait = true;
    this.empHomeService$.subscribe(
        data => {
          this.Employee = data;
          this.isWait = true;
        },
        err => {
          this.errorMessage = err;
          this.isWait = false;
        }  ,
        () =>  this.isWait = false
      );
  }

  close() {
    // closes imageViewer
    console.log('%c close fire', 'color:red') 
    this.enableKeyDetection = false;
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  close_window() {
    // closes marker info on map by clicking outside of marker if opened..
    if (this.previous_info_window !== null
       ) {
      this.previous_info_window.close();
      }
  }
  select_marker(infoWindow) {
    // closes already opended marker when clicking new marker..
    if (this.previous_info_window === null) {
     this.previous_info_window = infoWindow;
    } else {
     this.infoWindowOpened = infoWindow;
     this.previous_info_window.close();
    }
    this.previous_info_window = infoWindow;
   }
  firstClick() {
    console.log('Clicked');
  }

  details( data, i, first, last ) {
    // opens Image viewer dialog window.. 
    this.enableKeyDetection = true;
    this.currentID = parseInt(i, 10); // 10 is radix number to tell i value is going to be converted into decimal number..
    this.first = first;
    this.last = last;
    this.imageSrc = data.imageUrl;
  }
  detailsData(i) {
    // opens more details of image selected component fire HomeDetailsComponent by router..
//    this.router.navigate(['home/homedetails', paramEmployee.id]);
      this.router.navigate([i], { relativeTo: this.activatedRoute});
      // this is relative path navigation so that works always when path changes too.
  }
  goNext() {
    const length = this.Employee.length - 1;
    if (length <= this.currentID ) {
      this.currentID = 5;
      this.snackbar.open('You are in Last Item', '', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });
    } else {
      this.currentID = this.currentID + 1;
      console.log('Next ID ' + this.currentID);
      this.imageSrc = this.Employee[this.currentID].imageUrl;
    }
  }
  goPrevious() {
    const length = this.Employee.length - 1;
    if ( this.currentID === 0) {
      this.currentID = 0;
      this.snackbar.open('You are in First Item', '', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });

    } else {
    this.currentID = this.currentID - 1;
    this.imageSrc = this.Employee[this.currentID].imageUrl;
    }
  }

  showMapView() {
    const map = document.getElementById('maps');
    map.style.display = 'block';
  }
  closeMapView() {
    const map = document.getElementById('maps');
    map.style.display = 'none';
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
