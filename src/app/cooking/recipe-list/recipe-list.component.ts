import { Component, OnInit } from '@angular/core';
import { CookingServiceService } from '../cooking-service.service';
import { cookingComponent } from '../cooking-routing.module';
import { ICooking } from '../icooking';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
public cooking: ICooking[];
public errorMessage: string;

  constructor(private cookingRecipe: CookingServiceService) { }

  ngOnInit() {
    this.cookingRecipe.getRecipe()
    .subscribe(
          data => this.cooking = data['recipes'], // ' recipe ' is json object
          err => this.errorMessage = err
    );
    }
search_title(){
  // can call this from recipe-topbar.ts onActivate() method and we can pass value default.. 
  console.log('called from cook-topbar');
}

}
