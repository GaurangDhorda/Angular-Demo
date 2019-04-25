import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-shopping-topbar',
  templateUrl: './shopping-topbar.component.html',
  styleUrls: ['./shopping-topbar.component.css']
})
export class ShoppingTopbarComponent implements OnInit {
  public showView;
  public padding;
  public w;
public fontFamily;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 992px)'])
                           .subscribe((state: BreakpointState) => {
                                if ( state.matches ) {
                                  this.showView = '0px';
                                  this.fontFamily = 'Roboto, "Helvetica Neue", sans-serif' ;
                                  this.padding = '8px 20px';
                                  this.w='92.5%';
                                  console.log(this.showView);
                                } else {
                                  this.w= '100%' ;
                                  this.padding= '8px 16px';
                                  console.log('not fire 780');
                                }
                            });
  }

}
