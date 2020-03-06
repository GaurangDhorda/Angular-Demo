import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule , shoppingRoutingModule } from './shopping-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';

const MaterialComponentsArray = [ MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
                                  MatDialogModule, MatFormFieldModule, MatInputModule, MatBadgeModule, ShoppingRoutingModule
                                ]
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    shoppingRoutingModule,
    CartComponent
                ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsArray
  ],
  exports:[MaterialComponentsArray]
})
export class ShoppingModule { }
