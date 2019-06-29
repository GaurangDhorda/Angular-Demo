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
public counter = 0;

  constructor(private cookingRecipe: CookingServiceService) { }

  ngOnInit() {
    this.cookingRecipe.getRecipe()
    .subscribe(
          data => this.cooking = data['recipes'], // ' recipe ' is json object
          err => this.errorMessage = err
    );
    }

    ngAfterContentInit(){
      console.log("recipe-list - ngAfterContentInit()");
    }
    
    ngAfterContentChecked(){
      console.log("recipe-list - ngAfterContentChecked()");
    }
    
    ngAfterViewInit(){
      console.log("recipe-list - ngAfterViewInit()");
    }
    
    ngAfterViewChecked() {
      
      console.log("recipe-list - ngAfterVIewChecked()", this.counter);
    }
    ngOnDestroy() {
      // resetting search string..
      this.cookingRecipe.resetSearchItemName();
    }
    counterSearchResult(c){
        return this.counter= this.counter + 1;
    }
    resetCounter(){
     this.counter = 0;
    }
      search_title(){
        // can call this from recipe-topbar.ts onActivate() method and we can pass value default.. 
        console.log('called from cook-topbar');
      }
      getRecipe( recipe_ID ){
        console.log('Recipe_Id ', recipe_ID);
      }

      public highlight( title: string) {
        // this p tag [innerHTML]="highlight(recipe.title)" in html file replaces highlight text.
         if ( !this.cookingRecipe.getSearchByItemName()) {
            // default value is zero so return text as it is..
              return title;
            } else {
            // take input value form topbar search and replace it with current titile.
            // hightlightText is css property.
            return title.replace(new RegExp(this.cookingRecipe.getSearchByItemName().trim() , 'gi'), match => {
              return '<span class="highlightText">' + match + '</span>';
          });
        }
      }
}

