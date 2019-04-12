import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { IEmployee } from 'src/app/iemployee';

@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
public empId;
public employee = [];
public emp: IEmployee[];
public imageUrl: string;
public errorMessage:string;
  constructor(private empService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = parseInt( this.route.snapshot.paramMap.get( 'id' ) );
    this.empId = id;

    this.empService.getEmployees()
    .subscribe(
        data => {
          this.employee =  data;

        },
        err => this.errorMessage = err
      );
  }

  ngAfterContentChecked () {
    // this.imageUrl = this.employee.find(x => x.id === this.empId);
    this.emp = this.employee.filter( empid =>{
      return empid.id === this.empId;
    } );
    console.log( this.emp ) ;
  }
  goBack() {
    this.router.navigate(['home']);

  }
}
