import { Component, OnInit } from '@angular/core';
import { CookingServiceService } from '../cooking-service.service';
import { Router, NavigationStart, Event, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-cooking-topbar',
  templateUrl: './cooking-topbar.component.html',
  styleUrls: ['./cooking-topbar.component.css']
})
export class CookingTopbarComponent implements OnInit {
  public title = 'cooking';
  public searchData: string;
  public Angular = '';
  public isWait: boolean;
  constructor(private cookingService: CookingServiceService, private router: Router) { }

  ngOnInit() {
    /* this.router.events.subscribe(( event: Event) => {
      switch(true){
        case event instanceof NavigationStart: {
          this.isWait = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isWait = false;
          break;
        }
        default: {
          break;
        }
      }
    }); */
  }
  onActivate(componentReference) {
    // calling from router-outlet 
    console.log('cooking reference ' , componentReference);
    componentReference.search_title();
  }
    searchRecipeByName(searchData) {
      console.log('SearchByName',searchData);
      this.cookingService.searchByItemName(searchData);
      
    }
}
