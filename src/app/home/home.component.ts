import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../iemployee';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public Employee = [];
  public errorMessage: string;
  public sub: Subscription;
  public alive: boolean;
  constructor(private empServiceData: EmployeeService, private router: Router) {
    this.alive = true;
   }

  ngOnInit() {
    this.empServiceData.getEmployees().pipe(takeWhile(() => this.alive))
    .subscribe(
        data => this.Employee = data,
        err => this.errorMessage = err
      );
      // console.log('Home Employee data ',this.Employee.find(e => {e.id}));


  }

  firstClick() {
    console.log('Clicked');
  }
  detailsData( paramEmployee ) {
    this.router.navigate(['home/homedetails', paramEmployee.id]);
  }
  ngOnDestroy(){
    this.alive = false;
  }
}
