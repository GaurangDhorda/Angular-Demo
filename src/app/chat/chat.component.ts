import { Component, OnInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { catchError, tap, throttleTime, distinctUntilChanged, filter, scan, skipWhile } from 'rxjs/operators';
import * as moment from 'moment';
import { EmployeeService } from '../employee.service';
import {   } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  container: HTMLElement;
  totalUser: number;
  message = '';
  messages: string[] = [];
  secretCode: string;
  typing: string;
  timeout ;
  constructor(private chatService: EmployeeService ) { 
      this.secretCode = 'DONT TELL';

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

  }
  ngOnInit() {
    console.log('Total Users :', this.totalUser);
    this.chatService.getTotalUser().subscribe((users: number ) => {
      this.totalUser = users;
      
    });
    this.chatService.getMessages()
    .pipe(  throttleTime(1000), distinctUntilChanged(), filter((message: string ) => message.trim().length > 0)
            // , skipWhile((message) => message !== this.secretCode)
              , scan((acc: string, message: string, index: number) =>
                      ` (${index + 1}) ${message}` , '1')
         )
    .subscribe((message: string) => {
      console.log(message);
      let currentTime = moment().format('hh:mm:ss a');
      let messageWithTimestamp =  `${currentTime}: ${message}`;
      this.messages.push(messageWithTimestamp);
      console.log('messages: ', this.messages);
      });
  }
  sendMessage(event: string) {
         this.chatService.sendMessage(this.message);
          this.message = '';
  }
  timeoutFunction() {
    this.chatService.timeout();
  }

  UserTyping() {
      this.chatService.userIsTyping();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.chatService.timeout(); }, 5000);
      
  }

}
