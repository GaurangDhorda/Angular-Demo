import { Component, OnInit } from '@angular/core';
import { CookingServiceService } from '../cooking-service.service';
import { cookingComponent } from '../cooking-routing.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
public cooking = [];
public errorMessage: string;
  constructor(private cookingRecipe: CookingServiceService) { }

  ngOnInit() {
    this.cookingRecipe.getRecipe()
    .subscribe(
          data => this.cooking = data,
          err => this.errorMessage = err
    );
    console.log('list ' , this.cooking);
  }
}
