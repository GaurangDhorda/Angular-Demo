import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  public title = 'Contact';
  messageForm: FormGroup;
  submitted = false;
  success = false;
  currentDate = new Date();
  end = new Date();
  private _userName: string;
  imgSrc;
  fileUpload: File;
  get userName(): string{ // two way binding using getters and setters in input type="name"
    return this._userName;
  }
  set userName(value: string){
    this._userName = value;
  }

  @ViewChild('nameRef')  nameElementRef: ElementRef; // #nameRef is template reference variable in html file of input type=name

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.currentDate.setHours(0,0,0,0);
    this.end.setHours(23,59,59,999);
   // alert( this.currentDate.toLocaleString() + ':' + this.end.toLocaleString() + ' CurrentTime: ' + this.currentDate.getDate() );
   }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'message': ['', Validators.required], // Validators.pattern(/^\s*/)],
        'myDate' : ['', Validators.required ]
    });
        // (<HTMLInputElement>document.getElementById("dateControl")).value = this.currentDate.toLocaleDateString() + '/' + this.currentDate.getMonth();
    console.log( this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear() );
   // document.querySelector('#dateControl').nodeValue=new Date().toISOString().substr(0,10); //sets default date to control.
  }

  ngAfterViewInit(){
    // all dom events and properties are accesible only in this lifecycle hooks..
    // all template reference variable initialisation takes place here ... see @ViewChild(' nameRef ')..
    this.nameElementRef.nativeElement.focus(); // this line focus input type=name with #nameRef
  }
  onFileSelected(event){

    this.fileUpload = <File> event.target.files[0];
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any ) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      console.log(this.imgSrc)

      console.log(event.target.files)

    }
    // console.log(event.target.files[0]);
  }
  uploadFile(){
    const fd = new FormData();
    if (this.fileUpload){
      fd.append('image', this.fileUpload , this.fileUpload.name);
      this.onFileUpload(fd).subscribe( file =>{
        console.log('success ' + file.msg);
      });
    }
    }
  onFileUpload(path: FormData) {
    console.log('jsonData' + path);
    // console.log( JSON.stringify(path.get('image')));
    return this.http.post <any> ('http://chatnodejsappdemo.herokuapp.com/fileUpload' , path);
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;
  }
}
