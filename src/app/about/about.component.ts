import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({backgroundColor: 'green'}),
        animate(1000, style({height: '*'}))
      ]),
      transition(':leave', [
        animate(1000, style({backgroundColor: 'red'}))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, OnChanges {
  public title = 'About';
  public date = new Date();
  users = [
    {id: 1, name: 'john'},
    {id: 2, name: 'happy one'},
    {id: 3, name: 'new one check'}
  ];
  constructor(private routes: ActivatedRoute) { // activateRoute used to get parameters and values defined in routerLink..
    console.log('Constructor of aboutComponent');
   }

   ngOnChanges() {
    console.log('ngOnChanges of aboutComponent');
   }
   trackByFn(index: number, id: any) {
     return id.id;
   }
   loadNew() {
    this.users = [
      {id: 1, name: 'john'},
      {id: 2, name: 'happy one'},
      {id: 3, name: 'new one check'},
      {id: 4, name: 'New load data loaded'}
    ];
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
