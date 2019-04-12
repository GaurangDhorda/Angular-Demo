import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  currentDate = new Date();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
        name: ['', Validators.required],
        message: ['', Validators.required], // Validators.pattern(/^\s*/)],
        currentDate: ['', Validators.required ]
    });
    console.log( this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear() );
   // document.querySelector('#dateControl').nodeValue=new Date().toISOString().substr(0,10); //sets default date to control.
  }
  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;
  }
}
