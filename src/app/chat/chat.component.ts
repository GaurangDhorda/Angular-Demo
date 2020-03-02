import { Component, OnInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { catchError, tap, throttleTime, distinctUntilChanged, filter, scan, skipWhile } from 'rxjs/operators';
import * as moment from 'moment';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { ChatService } from '../chat.service';

declare var gtag;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit, AfterViewChecked {
  public title = 'Chat';
  container: HTMLElement;
  userName: string;
  messageUserName: string;
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
  readOnly = true;

  constructor(private chatService: EmployeeService, private dialog: MatDialog,
              private snackbar: MatSnackBar, private chatingService: ChatService ) { 
      this.secretCode = 'DONT TELL';
  }

  openDialog() {
    this.userName = '';
    this.messages = [];
    
    let dialogBoxSettings = {
      height: '350px',
      width: '500px',
      margin: '0 auto',
     // disableClose: false,
     backdropClass: 'backdropBackground',
      hasBackdrop: true // false used for prevented users to clicking to background while dialog is open..
    };
    
    let Dref = this.dialog.open(DialogComponent, dialogBoxSettings);
    Dref.componentInstance.submitClicked.subscribe(result => {

      // submitClicked is parameter comes from child to parent [Login Dialog to Chat component ] using @Output in LoginDialog...
      // Create New User dialog sends value to Login Dialog and LoginDialog sends that values to chatComponent...
      // submitClicked is event emmitted by Login Dialog... 
      // alert('submitted '+ result);
      // this.readOnly = ! this.readOnly;
      this.openDialog();
    });
    Dref.afterClosed().subscribe(result => {
      Dref.close();
      if (result && result !== 'false' ) {
        console.log('result : ', result);
        this.readOnly = ! this.readOnly;
        this.displaySpinner = true;
        // Google Analytics for login method...
        gtag('event', 'ChatLogin', {
          'event_category': 'Chat_Login',
          'event_label': 'Chat Login Using firebase',
        });
       //  this.userName = result; 
        this.logoutButton = true;
        this.chatService.getUsers().subscribe(
          (users: number ) => {
            this.totalUser = users;
            localStorage.setItem('totalUser', JSON.stringify(this.totalUser));
       }, err =>{ alert( 'from Chat errro' + err); this.readOnly = ! this.readOnly;  }
         ); 
    } else if( result === undefined ){
      this.readOnly = true;
    }
    else  {  this.userName = 'Guest';
             this.readOnly = ! this.readOnly;
           }
    } );
  }
  logout() {
    if ( this.userName === '') {
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
   else if (this.userName !== 'Guest') {

    localStorage.removeItem('totalUser');
    this.chatingService.logout();
    this.logoutButton = false;
    this.userName = '' ;
    this.messages.splice(0);
    this.readOnly = ! this.readOnly;
    this.openDialog();
  }
  else {
    this.readOnly = ! this.readOnly;
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
  } else {
    if (this.userName !== 'Guest'){
      this.userName = '';
    }
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
        this.readOnly = false;
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
          filter((message) => message['messageData'].trim().length > 0 )
           // message.trim().length > 0)
            // , skipWhile((message) => message !== this.secretCode)
         /* scan((acc: string, message: string, index: number) =>
                      ` (${index + 1}) ${message}` , '1')  */
         )
    .subscribe((message) => {
      console.log( JSON.stringify(message));
      let currentTime = moment().format('hh:mm:ss a');
      let messageWithTimestamp =  `${currentTime}: ${message}`;
      this.timeStamp.push( currentTime );
      this.messages.push(message);
      this.messageUserName = message['userName'];
      });
  }
  trackByFn(index: number, id: any) {
    return id.id;
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
