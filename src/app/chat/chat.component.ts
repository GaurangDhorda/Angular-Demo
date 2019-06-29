import { Component, OnInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { catchError, tap, throttleTime, distinctUntilChanged, filter, scan, skipWhile } from 'rxjs/operators';
import * as moment from 'moment';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  container: HTMLElement;
  userName: string;
  totalUser: number;
  message = '';
  messageDiv = '';
  messages: string[] = [];
  timeStamp: string[] = [];
  secretCode: string;
  typing: string;
  timeout ;
  logoutButton = false;
  currentMessage: boolean;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displaySpinner = false;
  constructor(private chatService: EmployeeService, private dialog: MatDialog, private snackbar: MatSnackBar ) { 
      this.secretCode = 'DONT TELL';
  }
  openDialog() {
    let dialogBoxSettings = {
      height: '300px',
      width: '500px',
      margin: '0 auto'
    };
    let Dref = this.dialog.open(DialogComponent, dialogBoxSettings);
    Dref.afterClosed().subscribe(result => {
      if (result && result !== 'false' ) {
        console.log('result : ', result);
        this.displaySpinner = true;
       //  this.userName = result; 
        this.logoutButton = true;
        this.chatService.getUsers().subscribe(
          (users: number ) => {
            this.totalUser = users;
            localStorage.setItem('totalUser', JSON.stringify(this.totalUser));
       }, err =>{ alert( 'from Chat errro' + err);  }
         ); 
    } else  this.userName = 'Guest';
    } );
  }
  logout() {
    if(this.userName === '') {
        this.openDialog();
        
        this.chatService.getUsers().subscribe(
        (users: number ) => {
          this.totalUser = users;
          localStorage.setItem('totalUser', JSON.stringify(this.totalUser));
     }, err =>{ alert(err); }
       );
        this.chatService.getTotalUser().subscribe(
          (users: number ) => {
               this.totalUser = users;
               localStorage.setItem('totalUser', JSON.stringify(this.totalUser));
          }, err =>{ alert(err); });

    }
    if (this.userName !== 'Guest') {

    localStorage.removeItem('totalUser');
    this.chatService.logout();
    this.logoutButton = false;
    this.userName = '' ;
    this.messages.splice(0);
  }
  else {
    this.openDialog();
    this.chatService.getTotalUser().subscribe(
      (users: number ) => {
           this.totalUser = users;
           console.log('Total User is', this.totalUser);
           localStorage.setItem('totalUser', JSON.stringify(this.totalUser));
           
      });
    this.totalUser = JSON.parse(localStorage.getItem('totalUser'));
    
  }
  }

  ngAfterViewChecked(){
    // auto scroll messages div when sending new messages.. 
    this.container = document.getElementById('messages'); // id of div tag is messages
    this.container.scrollTop = this.container.scrollHeight;
  }

  ngAfterContentChecked() {
    this.chatService.getUserisTyping().subscribe((useristyping: string) => {
      this.typing = useristyping;
  });
  
  this.totalUser = JSON.parse(localStorage.getItem('totalUser'));

  if ( this.chatService.isLoggedIn) {
    const item = JSON.parse(localStorage.getItem('user'));
    this.userName = item.email;
    this.displaySpinner = false;
  }
  else{
    if (this.userName === 'Guest'){}
    else{
    this.userName ='';}
  }
  }
 
  checkUserLogedInOrNot() {
    const u = this.chatService.isloggedInMethod();
    console.log('isLogedIn :', u);
   /* if(u) {
      //this.openDialog();
    }
    else{this.openDialog();} */
  }

  ngOnInit() {
    console.log(this.chatService.isLoggedIn);
    if ( this.chatService.isLoggedIn) {
        const item = JSON.parse(localStorage.getItem('user'));
        this.userName = item.email;
        this.logoutButton = true;
    } else  { this.openDialog(); }

    //this.checkUserLogedInOrNot();
    //console.log('Total Users :', this.totalUser);
    this.chatService.getTotalUser().subscribe(
          (users: number ) => {
               this.totalUser = users;
               localStorage.setItem('totalUser', JSON.stringify(this.totalUser));
          });
    
    this.chatService.getMessages()
    .pipe( throttleTime(1000), distinctUntilChanged(), 
          filter((message: string ) => message.trim().length > 0),
            // , skipWhile((message) => message !== this.secretCode)
          scan((acc: string, message: string, index: number) =>
                      ` (${index + 1}) ${message}` , '1')
         )
    .subscribe((message: string, userName: string) => {
      
      console.log(message);
      let currentTime = moment().format('hh:mm:ss a');
      let messageWithTimestamp =  `${currentTime}: ${message}`;
      this.timeStamp.push( currentTime );
      this.messages.push(message);
      console.log('messages: ', this.messages);
      });
  }
  sendMessage(event: string) {
         this.chatService.sendMessage(this.message, this.userName);
         this.messageDiv = this.message;
         this.message = '';

  }
  timeoutFunction() {
    this.chatService.timeout();
  }

  UserTyping() {
      this.chatService.userIsTyping(this.userName);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.chatService.timeout(); }, 5000);
  }

}