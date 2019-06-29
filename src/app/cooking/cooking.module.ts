import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookingRoutingModule , cookingComponent } from './cooking-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ cookingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CookingRoutingModule,
    ScrollingModule

  ]
})
export class CookingModule { 
  constructor() {
    console.log('Lazily Loaded : CookingModule');
  }
}
