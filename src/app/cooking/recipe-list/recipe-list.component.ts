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
public cooking : ICooking[];
public errorMessage: string;
  constructor(private cookingRecipe: CookingServiceService) { }

  ngOnInit() {
    this.cookingRecipe.getRecipe()
    .subscribe(
          data => this.cooking = data["recipes"],
          err => this.errorMessage = err
    );
  
  }

}
