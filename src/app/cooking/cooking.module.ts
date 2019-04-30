import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookingRoutingModule , cookingComponent } from './cooking-routing.module';

@NgModule({
  declarations: [ cookingComponent],
  imports: [
    CommonModule,
    CookingRoutingModule
  ]
})
export class CookingModule { }
