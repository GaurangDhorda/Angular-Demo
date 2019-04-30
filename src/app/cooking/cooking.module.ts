import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookingRoutingModule , cookingComponent } from './cooking-routing.module';

@NgModule({
  declarations: [ cookingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CookingRoutingModule

  ]
})
export class CookingModule { }
