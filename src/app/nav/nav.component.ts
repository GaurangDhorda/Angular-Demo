import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();
  appTitle = 'myapp';
  public item: boolean;
  constructor() { }

  ngOnInit() {
    this.item = false;
  }
  fireEvent() {
    this.childEvent.emit('Child component message');
  }
 myFunction() {
      this.item = true;
      const x = document.getElementById('myTopnav');
      if ( window.innerWidth <= 780 ) {
        if (x.className === 'myContainer') {
          x.className = 'responsive';
          //
          console.log('if: responsive');
        } else {
          const icon = document.getElementById('icon');
          x.className = 'myContainer';
          console.log('else: myContainer');
        }
      }
  }
}
