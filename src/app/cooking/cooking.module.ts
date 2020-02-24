import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookingRoutingModule , cookingComponent } from './cooking-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ cookingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CookingRoutingModule,
    ScrollingModule,
    MatProgressBarModule

  ]
})
export class CookingModule { 
  constructor() {
    console.log('Lazily Loaded : CookingModule');
  }
}
