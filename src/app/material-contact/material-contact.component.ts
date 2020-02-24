import { Component, OnInit, ViewChild, HostListener, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { DataModel } from './datamodel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialContactListComponent } from './material-contact-list/material-contact-list.component';
import { ConfirmDialogModel } from '../confirmdialog/confirmdialog.component';


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
editBoxData = [];
dataRead = [];
public editData: boolean;
title: string;
editDataTitle = '';

@ViewChild('formDirective', { static: true }) formDirective: NgForm;

  constructor( private formBuilder: FormBuilder, private formService: EmployeeService, private el: ElementRef,
               private snackbar: MatSnackBar, private router: Router, 
               private dialog: MatDialog) { }

  ngOnInit() {
    this.editDataTitle = this.formService.editDataTitle;
    if (this.editDataTitle === '') {
      this.title = 'Material Contact Form';
    } else {
      this.title = 'Edit Data';
    }
    const divLoader = document.getElementById('loader');
    divLoader.classList.add('hidden');
    this.breakPoint = (window.innerWidth <= 780) ? 1 : 2;
    this.editData = false;
    // this.formGroup.setValue( this.formService.getEditData());
// console.log('data model' + this.formService.dataModel);
    if (this.formService.dataModel !== undefined) {
      this.editData = true;
      console.log( 'called from edit '+ this.editData);
      console.log(this.formService.dataModel);
      this.dataModel = this.formService.getEditData();
      console.log('data from Edit Box ' + this.dataModel.fullname);
      this.formGroup = this.formBuilder.group ({
        'key': [this.dataModel.key],
        'fullname': [this.dataModel.fullname, Validators.required],
        'email': [this.dataModel.email, Validators.email],
        'mobile': [this.dataModel.mobile, [Validators.required, Validators.minLength(10)]],
        'city': [this.dataModel.city],
        'gender': [this.dataModel.gender],
        'department':[this.dataModel.department],
        'hireDate':[this.dataModel.hireDate],
        'isPermenent':[this.dataModel.isPermenent]
      });
      this.formService.dataModel = undefined;
    }

    else {
    
    this.formGroup = this.formBuilder.group({
      'key': [0],
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
  }
  
  readdata() {
    /*const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    this.formService.onRead().subscribe( data => {
      this.dataRead = data;
  });*/

      this.router.navigate(['material-contact-list']);
  }
  close() {
    // closes imageViewer 
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  /* @HostListener ('window:scroll', ['$event'])
  onscroll(e){
    console.log(event.srcElement.scrollTop);
    console.log('top ' + this.el.nativeElement.getBoundingClientRect().top);
  } */

  onSubmit() {
    if (this.formGroup.valid ) {
        if (this.editData ) {
          // this.dataModel  = this.formService.getEditData();
          this.dataModel  = this.formGroup.value;
          const divLoader = document.getElementById('loader');
          divLoader.classList.remove('hidden');
          this.displaySpinner = true;
          //  console.log('edit submit clicked ' + this.formGroup.controls['fullname'].value);
          this.formService.onContactEdit(this.dataModel).subscribe( data => {
              console.log( 'edit ' + data.fullname);
            }, err => {
              this.snackbar.open('Error: Data not saved ' + err.message , '', {
                duration: 3000
              });
              divLoader.classList.add('hidden');
              this.displaySpinner = false;
            }, () => {
              this.onClear();
              this.snackbar.open('Data Editted Successfully ', '', {
                duration: 3000
               });
              divLoader.classList.add('hidden');
              this.displaySpinner = false;
              const dref = this.dialog.openDialogs;
              console.log(dref.map(data => {
                  data.close('true');
              }));
            });
        } else {
                const divLoader = document.getElementById('loader');
                divLoader.classList.remove('hidden');
                this.displaySpinner = true;
                this.dataModel = this.formGroup.value;
                // alert(this.formGroup.controls['fullname'].value);
                // alert(this.formGroup.getRawValue());
                // console.log(this.formGroup.getRawValue());
                // console.log('dataModel: ' ,this.dataModel);
                this.formService.onSubmit(this.dataModel).subscribe(
                  data => { console.log('success', data);
                          // on success this fire.. and data getback here..
                          },
                  err => {
                          // on error this fire and error handling done here...
                      console.log('failure ', err);
                      if (err.status === 0){
                        alert('No internet connection found');
                      }
                      this.snackbar.open('Data not saved ' + err.message , '', {
                        duration: 3000
                      });
                      divLoader.classList.add('hidden');
                      this.displaySpinner = false;
                  },
                  () => {
                        // on successfully completion this fire..
                            this.onClear();
                            this.snackbar.open('Data Saved Succeessfully', '',
                                    { duration: 3000 }
                                );
                            divLoader.classList.add('hidden');
                            this.displaySpinner = false;
                         }
                  );
                  }
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
      key: 2,
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
