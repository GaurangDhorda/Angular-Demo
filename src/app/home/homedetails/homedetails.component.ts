import { Component, OnInit, AfterContentInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { IEmployee } from 'src/app/iemployee';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
public empId;
public employee = [];
public emp: IEmployee ;
public imageUrl: string;
public errorMessage: string;
public chk: boolean;
public sub: any;

  constructor(private empService: EmployeeService, private route: ActivatedRoute,
              private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.chk = true;
    console.log('onInit');
   // let id = parseInt( this.route.snapshot.paramMap.get( 'id' ) );
    // this.empId = id;

    this.empService.getEmployees()
    .subscribe(
        data => {
          this.employee =  data;
        },
        err => this.errorMessage = err
      );

    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt( params.get( 'id' ) );
      this.empId = id
      console.log('id :' , this.empId);
    });
 }
ngOnDestroy() { 
this.sub.unsubscribe();
}
 ngAfterContentChecked() {
  // this.imageUrl = this.employee.find(x => x.id === this.empId);
 /* this.emp = this.employee.filter( (employeedata, index) =>{
    return employeedata.id === this.empId;
    //return employeedata[index] === this.empId; 
  } ); */ 
  // console.log( this.employee[this.empId].find ( data => data.id === 'this.employee[this.empId].id' ));
  this.emp = this.employee [this.empId];
  const lengthofdata = this.employee.length;
  this.chk = lengthofdata -1 >= this.empId;
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
}
