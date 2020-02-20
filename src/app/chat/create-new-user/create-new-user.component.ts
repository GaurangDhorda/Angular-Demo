import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {
  formGroup: FormGroup;
  email: string;
  password: string;
  constructor( private firebaseAuthEmployeeService: EmployeeService, private formBuilder: FormBuilder, private snackbar: MatSnackBar  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'email': ['',  [Validators.email, Validators.required ]],
      'pass':['', Validators.required],
      'passwordMatcher': ['', Validators.required]
    });
  }

  createUser() {
    this.firebaseAuthEmployeeService.createNewUser(this.formGroup.controls['email'].value, this.formGroup.controls['pass'].value)
    .then(res => {
      console.log(res);
      alert('Your account has been created'); 
    }, err => {
        console.log(err);
           // alert(err.message + ' try different Email ID');
        const snack = this.snackbar.open (err.message + ' Try different Email ID', 'OK');
        snack.onAction().subscribe( () => {
        });
       }
    );

  }
  verifyPassword(value: string) {
    if (this.password === value) {
      alert ('password Match');
    }
  }
}
