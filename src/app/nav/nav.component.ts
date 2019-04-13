import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();
  appTitle = 'myapp';
  constructor() { }

  ngOnInit() {
  }
  fireEvent() {
    this.childEvent.emit('Child component message');
  }
 myFunction() {
        const x = document.getElementById('myTopnav');
        if (x.className === 'myContainer') {
          x.className = 'responsive';
          console.log('if: responsive');
        } else {
          x.className = 'myContainer';
          console.log('else: myContainer');
        }
  }
}
