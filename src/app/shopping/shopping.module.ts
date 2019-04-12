import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule , shoppingRoutingModule } from './shopping-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    shoppingRoutingModule,
    CartComponent
                ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShoppingRoutingModule,
    BrowserModule,
  ]
})
export class ShoppingModule { }
