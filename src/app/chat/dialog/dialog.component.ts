import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userName: string;
  password: string;
  constructor(private firebaseAuthService: EmployeeService) { this.userName = ''}

  ngOnInit() {

  }
  logIn(){
  //console.log('logIn');
  if ( this.firebaseAuthService.isLoggedIn ) {
    console.log(' User is Loged In');
  } else{
   const result = this.firebaseAuthService.login(this.userName, this.password );
    console.log('Return value of LogIn ', result);
    }
  }
}