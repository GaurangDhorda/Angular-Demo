import { Component, OnInit, AfterContentInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { IEmployee } from 'src/app/iemployee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
public empId;
public employee = [];
public employeeView = [];
public imageUrl: string;
public errorMessage: string;
public chk: boolean;
public sub: any;
lengthofdata;

  constructor(private empService: EmployeeService, private route: ActivatedRoute,
              private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.chk = true;
   // let id = parseInt( this.route.snapshot.paramMap.get( 'id' ) );
    // this.empId = id;

    this.empService.getEmployees()
    .subscribe(
        data => {
          this.employee =  data;
          console.log( 'data '+ this.employee.length);
          this.lengthofdata = this.employee.length;
        },
         // error message gose here
        err => this.errorMessage = err ,
        () => { // when data api calling complete then calling this fuction..
            // first get id parameter from router
          this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
            const id = parseInt( params.get( 'id' ) );
            this.empId = id;
          });
            // then get only data of passed id.
          this.employeeView = this.employee [this.empId];
            // set data found or not view.. see if condition of html file value of chk..
          this.chk = this.lengthofdata-1 >= this.empId;
          console.log('chk ' + this.chk );
        }
      );

  }
  ngAfterContentChecked () {
    if(this.employee.length) {
      this.employeeView = this.employee[this.empId];
    }
  }
  goNext()  {
    if (this.empId === 5) {
      this.snackbar.open('You are in Last Item', '', {
          duration: 3000
      });
      // alert('already in Last list item');
      this.empId = 5;
    } else{
    const nextId = this.empId + 1 ;
    
    this.router.navigate(['/home' , nextId]);
    }
  }
  goPrevious()  {
    if (this.empId === 0) {
      this.snackbar.open('You are in First Item', '', {
        duration: 3000
    });
      // alert('already in First list item');
      this.empId = 0;
    } else {
    const previousId = this.empId - 1 ;
    this.router.navigate(['/home' , previousId]);
    }
  }
  goBack() {
    this.router.navigate(['../' , {id: this.empId}], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
