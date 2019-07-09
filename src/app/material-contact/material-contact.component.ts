import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { DataModel } from './datamodel';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-material-contact',
  templateUrl: './material-contact.component.html',
  styleUrls: ['./material-contact.component.css']
})
export class MaterialContactComponent implements OnInit {
formGroup: FormGroup;
breakPoint: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
displaySpinner: boolean;


departments = [
  {id: 3, value: 'Dep 1'},
  {id: 2, value: 'Dep 2'},
  {id: 3, value: 'Dep 3'},
];
dataModel = new DataModel(null, '', '', '' , '', '1', '0', '', false) ;
@ViewChild('formDirective') formDirective: NgForm;

  constructor( private formBuilder: FormBuilder, private formService: EmployeeService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    const divLoader = document.getElementById('loader');
    divLoader.classList.add('hidden');
    this.breakPoint = (window.innerWidth <= 780) ? 1 : 2;
    this.formGroup = this.formBuilder.group({
      '$key': [null],
      'fullname':['', Validators.required],
      'email':['', Validators.email],
      'mobile':['', [Validators.required, Validators.minLength(10)]],
      'city':[''],
      'gender':['1'],
      'department':['0'],
      'hireDate':[''],
      'isPermenent':[false],
    });
  }

  onSubmit() {
    const divLoader = document.getElementById('loader');
    divLoader.classList.remove('hidden');
    this.displaySpinner = true;
    if (this.formGroup.valid) {
      this.dataModel = this.formGroup.value;
      // alert(this.formGroup.controls['fullname'].value);
      // alert(this.formGroup.getRawValue());
      // console.log(this.formGroup.getRawValue());
      // console.log('dataModel: ' ,this.dataModel);
      this.formService.onSubmit(this.dataModel).subscribe(
        data => { console.log('success', data);
                  this.onClear();
                  this.snackbar.open(
                      'Data Saved Succeessfully',
                       '', { duration: 3000 }
                   );
                  divLoader.classList.add('hidden');
                  this.displaySpinner = false;
                },
        err => console.log('failure ', err)
      );
    } else {
      this.onClear();
    }
  }
  onClear() {
    
    
    //  //  this.formGroup.clearValidators();
   // this.formGroup.updateValueAndValidity();
    
   //this.formDirective.setValue
   //this.inistializeFormGroup();
 //  this.formGroup.controls['fullname'].clearValidators();
  //this.formGroup.controls['fullname'].updateValueAndValidity();
   //this.formGroup.controls['mobile'].clearValidators();
   //this.formGroup.controls['mobile'].updateValueAndValidity();
   //this.formGroup.controls['fullname'].markAsUntouched();
   
    /* this.formGroup.controls['mobile'].clearValidators();
   this.formGroup.controls['fullname'].clearValidators();
   this.formGroup.controls['fullname'].updateValueAndValidity();
    this.formGroup.controls['mobile'].updateValueAndValidity(); */
    
   
   this.formDirective.resetForm();
   this.formGroup.reset();
   this.formGroup.markAsPristine();
   this.formGroup.markAsUntouched();
   this.formGroup.updateValueAndValidity();
   this.inistializeFormGroup();
   // this.formGroup.clearValidators();
  // this.formGroup.updateValueAndValidity();
   //this.formGroup.controls['fullname'].setValidators();
  //this.formGroup.clearValidators();
  //this.formGroup.reset('');
  //this.formGroup.clearValidators();
  //this.formGroup.controls['fullname'].setValue(' ');
  //this.formGroup.controls['fullname'].;
  //this.formGroup.controls['fullname'].setErrors(null);   //updateValueAndValidity({onlySelf: true});
    //this.formGroup.controls['mobile'].setErrors(null);
    //this.formGroup.controls['mobile'].clearValidators();
    //this.formGroup.invalid;
  }

  inistializeFormGroup() {
    // this.formGroup.controls[' fullname '].setValidators(Validators.required);
    this.formGroup.setValue({
      $key: null,
      fullname: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermenent: false
    });
  }
  onResize(event) {
    this.breakPoint = (event.target.innerWidth <= 780) ? 1 : 2;
  }

}
