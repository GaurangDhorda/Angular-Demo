import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnChanges {


  constructor(private routes: ActivatedRoute) { // activateRoute used to get parameters and values defined in routerLink..
    console.log('Constructor of aboutComponent');
   }

   ngOnChanges() {
    console.log('ngOnChanges of aboutComponent');
   }
  ngOnInit() {
    console.log('ngOnInit of aboutComponent');
    this.routes.paramMap
    .subscribe(params => {
     let username = +params.get('username'); // + sign used to convert result into number
     console.log(username);
    });
  }
  ngDoCheck() {
    console.log('ngDoCheck of aboutComponent');
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit of aboutComponent');
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked of aboutComponent');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit of aboutComponent');
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked of aboutComponent');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy of aboutComponent');
  }
}
