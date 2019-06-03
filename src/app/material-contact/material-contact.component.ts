import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-material-contact',
  templateUrl: './material-contact.component.html',
  styleUrls: ['./material-contact.component.css']
})
export class MaterialContactComponent implements OnInit {
formGroup: FormGroup;
breakPoint: number;
departments = [
  {id: 3, value: 'Dep 1'},
  {id: 2, value: 'Dep 2'},
  {id: 3, value: 'Dep 3'},
];
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breakPoint = (window.innerWidth <= 700) ? 1 : 2;
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

  onClear(){
    this.formGroup.reset();
    this.inistializeFormGroup();
  }
  inistializeFormGroup() {
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
    this.breakPoint = (event.target.innerWidth <= 700) ? 1 : 2;
  }

}
