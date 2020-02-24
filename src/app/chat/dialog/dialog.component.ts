import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  @ViewChild('username') usernameElementRef: ElementRef;
  @Output() submitClicked = new EventEmitter<any>();
  userName: string;
  password: string;
  successuserName: string;
  formGroup: FormGroup;
  constructor(private firebaseAuthService: EmployeeService, private dialog: MatDialog, private formBuilder: FormBuilder) {
       this.userName = '';
       this.successuserName = '';
    }

  ngOnInit() {
    this.formGroup = this.formBuilder.group ({
      'userName': ['', [Validators.email, Validators.required]],
      'password': ['',[Validators.required, Validators.minLength(6)]]
    }

    )

  }
  inputLoginClick(){
    document.getElementById('buttonLogin').click();
  }
  logIn(){
  //console.log('logIn');
  if ( this.firebaseAuthService.isLoggedIn ) {
    console.log(' User is Loged In');
  } else{
    this.firebaseAuthService.login(this.formGroup.controls['userName'].value, this.formGroup.controls['password'].value )
   .then( (successVal: string) => 
        { 
          localStorage.setItem('userName', JSON.stringify(successVal));
        })
   .catch(err => console.log ('error in Firebase Login ', err.message));
    }
  }
  createNewUser() {
     this.dialog.closeAll();
    
     let dialogBoxSettings = {
      height: '400px',
      width: '500px',
      margin: '0 auto',
      backdropClass: 'backdropBackground',
      hasBackdrop: true // false used for prevented users to clicking to background while dialog is open..
    };
     let Dref = this.dialog.open( CreateNewUserComponent , dialogBoxSettings);
     const unsubscribeDref = Dref.afterClosed().subscribe(result => {
        if(result === 'false') {
          //window.location.reload();
          this.submitClicked.emit('false');  // emit sends value back to chatComponent refer submittClick event subcription..
          unsubscribeDref.unsubscribe();
        }
        else if(result === undefined){
          this.submitClicked.emit('false');
          unsubscribeDref.unsubscribe();
        }
    });
    

  }
}