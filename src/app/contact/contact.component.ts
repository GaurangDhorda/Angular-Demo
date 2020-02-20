import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {AbstractControl} from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  public title = 'Contact';
  messageForm: FormGroup;
  submitted = false;
  success = false;
  currentDate = new Date();
  end = new Date();
  private _userName: string;
  fileUpload: File;
  get userName(): string { // two way binding using getters and setters in input type="name"
    return this._userName;
  }
  set userName(value: string) {
    this._userName = value;
  }
  messages = [];
  loading = false;
  sessionId = Math.random().toString(36).slice(-5);
  @ViewChild('nameRef')  nameElementRef: ElementRef; // #nameRef is template reference variable in html file of input type=name

  constructor(private formBuilder: FormBuilder, private formService: EmployeeService) {
    this.currentDate.setHours(0,0,0,0);
    this.end.setHours(23,59,59,999);
   // alert( this.currentDate.toLocaleString() + ':' + this.end.toLocaleString() + ' CurrentTime: ' + this.currentDate.getDate() );
   }

  ngOnInit() {
    this.addBotMessage('Human presence detected 🤖. How can I help you? ');
    this.messageForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'message': ['', Validators.required], // Validators.pattern(/^\s*/)],
        'myDate' : ['', Validators.required ]
    });
    // (<HTMLInputElement>document.getElementById("dateControl")).value = this.currentDate.toLocaleDateString() +
    // '/' + this.currentDate.getMonth();
    console.log( this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear() );
   // document.querySelector('#dateControl').nodeValue=new Date().toISOString().substr(0,10); //sets default date to control.
  }
  handleUserMessage(event){
    console.log(event);
    this.addUserMessage(event.message);

    this.formService.dialogFLow(this.sessionId, event.message).subscribe(res => {
        console.log(res);
        const {fulfillmentText } = res;
        this.addBotMessage(fulfillmentText );
        this.loading = false;
    });
  }
  addUserMessage(text: string){
    this.messages.push({
      text,
      sender: 'You',
      replay: 'true',
      date: new Date()
    });
  }
  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
      avatar: '/assets/chatbot.png',
      date: new Date()
    });
  }
  ngAfterViewInit() {
    // all dom events and properties are accesible only in this lifecycle hooks..
    // all template reference variable initialisation takes place here ... see @ViewChild(' nameRef ')..
    this.nameElementRef.nativeElement.focus(); // this line focus input type=name with #nameRef
  }
  onFileSelected(event) {
    this.fileUpload = event.target.files[0] as File;
    // console.log(event.target.files[0]);
  }
  uploadFile() {
    const fd = new FormData();
    fd.append('image', this.fileUpload , this.fileUpload.name);
    this.formService.fileUpload(fd).subscribe( file => {
      console.log('success ' + file.msg);
   });
  }
  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;
  }
}
