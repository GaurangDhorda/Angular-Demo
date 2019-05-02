import { Component, OnInit } from '@angular/core';
import { CookingServiceService } from '../cooking-service.service';

@Component({
  selector: 'app-cooking-topbar',
  templateUrl: './cooking-topbar.component.html',
  styleUrls: ['./cooking-topbar.component.css']
})
export class CookingTopbarComponent implements OnInit {
  public searchData: string;
  public Angular='';
  constructor(private cookingService: CookingServiceService) { }

  ngOnInit() {
  }
  onActivate(componentReference) {
    // calling from router-outlet 
    console.log('cooking reference ' , componentReference);
    componentReference.search_title();
  }
    searchRecipeByName(searchData: string) {
      this.cookingService.searchByItemName(searchData);
    }
}
