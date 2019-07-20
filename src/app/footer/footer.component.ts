import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() user;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToHome() {
    console.log('click');
    this.router.navigate(['']);
  }

}
