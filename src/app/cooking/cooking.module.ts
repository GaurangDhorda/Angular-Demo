import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookingRoutingModule , cookingComponent } from './cooking-routing.module';

@NgModule({
  declarations: [ cookingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CookingRoutingModule

  ]
})
export class CookingModule { 
  constructor() {
    console.log('Lazily Loaded : CookingModule');
  }
}
