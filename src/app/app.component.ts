import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'gaurang';
  message = '';
  title = 'HelloWorld';
  public date = new Date();
  constructor() {
        this.name = 'Angular Tutorial!';
  }
}
