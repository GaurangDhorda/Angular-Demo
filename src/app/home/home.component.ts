import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../iemployee';
import { Router , ActivatedRoute } from '@angular/router';
// import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Subscription } from 'rxjs';
import { takeWhile, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapserviceService } from '../mapservice.service';

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
  constructor(private empServiceData: EmployeeService, private router: Router,
              private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {
    this.alive = true;
  }

  ngOnInit() {
    this.isWait = true;
    this.empServiceData.getEmployees().pipe(takeWhile(() => this.alive))
    .subscribe(
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
      // console.log('Home Employee data ',this.Employee.find(e => {e.id}));
  }

  close() {
    // closes imageViewer 
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
    this.currentID = parseInt(i, 10); // 10 is radix number to tell i value is going to be converted into decimal number..
    this.first = first;
    this.last = last;
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    console.log('imageUrl ' + data.imageUrl);
    this.imageSrc = data.imageUrl;
  }
  detailsData( paramEmployee , i  ) {
    // opens more details of image selected component fire HomeDetailsComponent by router..
//    this.router.navigate(['home/homedetails', paramEmployee.id]);
      this.router.navigate([ i], { relativeTo: this.activatedRoute});
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
