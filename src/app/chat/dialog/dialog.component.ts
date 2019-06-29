import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userName: string;
  password: string;
  successuserName: string;
  constructor(private firebaseAuthService: EmployeeService, private dialog: MatDialog ) { this.userName = ''; this.successuserName = ''}

  ngOnInit() {

  }
  logIn(){
  //console.log('logIn');
  if ( this.firebaseAuthService.isLoggedIn ) {
    console.log(' User is Loged In');
  } else{
    this.firebaseAuthService.login(this.userName, this.password )
   .then( (successVal: string) => { localStorage.setItem('userName', JSON.stringify(successVal)); }  )
   .catch(err => console.log ('error in Firebase Login ', err.message));
    }
  }
  createNewUser() {
    this.dialog.closeAll();
    let dialogBoxSettings = {
      height: '300px',
      width: '500px',
      margin: '0 auto'
    };
    let Dref = this.dialog.open( CreateNewUserComponent , dialogBoxSettings);

  }
}