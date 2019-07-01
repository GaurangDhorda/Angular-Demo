import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
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
      margin: '0 auto',
      backdropClass: 'backdropBackground',
      hasBackdrop: true // false used for prevented users to clicking to background while dialog is open..
    };
     let Dref = this.dialog.open( CreateNewUserComponent , dialogBoxSettings);
     const unsubscribeDref = Dref.afterClosed().subscribe(result => {
        if(result === 'false') {
          //window.location.reload();
          this.submitClicked.emit('false');
          unsubscribeDref.unsubscribe();
        }
        else if(result === undefined){
          this.submitClicked.emit('false');
          unsubscribeDref.unsubscribe();
        }
    });
    

  }
}