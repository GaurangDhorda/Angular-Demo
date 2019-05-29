import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
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
public emp: IEmployee ;
public imageUrl: string;
public errorMessage:string;
  constructor(private empService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log('onInit');
   // let id = parseInt( this.route.snapshot.paramMap.get( 'id' ) );
    //this.empId = id;

    this.empService.getEmployees()
    .subscribe(
        data => {
          this.employee =  data;
          console.log('service call');
        },
        err => this.errorMessage = err
      );


    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt( params.get( 'id' ) );
      this.empId = id;
      console.log('id :' , this.empId);
 
    });

 }
  goNext()  {
  
    if (this.empId === 5){
      alert('already in Last list item');
      this.empId=5;
    } else{
    let nextId = this.empId + 1 ; 
    this.router.navigate(['/home' , nextId]);
    }
  }
  goPrevious()  {
    if (this.empId === 0){
      alert('already in First list item');
      this.empId=0;
    } else{
    let previousId = this.empId - 1 ; 
    this.router.navigate(['/home' , previousId]);
    }
  }
  
  

  ngAfterContentChecked () {
    // this.imageUrl = this.employee.find(x => x.id === this.empId);
   /* this.emp = this.employee.filter( (employeedata, index) =>{
      return employeedata.id === this.empId;
      //return employeedata[index] === this.empId; 
    } ); */ 
    console.log('afterContentChecked');
    this.emp = this.employee [this.empId];
    //this.emp =  this.employee[this.empId];
  }
  goBack() {
    this.router.navigate(['../' , {id: this.empId}], { relativeTo: this.route });

  }
}
