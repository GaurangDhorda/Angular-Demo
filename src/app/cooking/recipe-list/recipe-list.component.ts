import { Component, OnInit } from '@angular/core';
import { CookingServiceService } from '../cooking-service.service';
import { ICooking } from '../icooking';
import {  tap } from 'rxjs/operators';
import {  Observable } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public title = 'Cooking/List';
public cooking: ICooking[];
public errorMessage: string;
public counter = 0;
public isWait:boolean;
public cooking$: Observable<ICooking[]>;
  constructor(private cookingRecipe: CookingServiceService) { }

  ngOnInit() {
  //  console.log(this.cookingRecipe.getRecipe$.pipe(tap(data => console.log(data))));
    this.cooking$ = this.cookingRecipe.getRecipe$.pipe(tap (data => {
      console.log('data ' + data);
    }));
    this.isWait = true;
    this.cookingRecipe.getRecipe()
    .subscribe(
          data => {
            
            this.cooking = data['recipes'];
          } , 
          err => this.errorMessage = err,
          () => this.isWait = false
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

