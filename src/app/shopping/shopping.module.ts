import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule , shoppingRoutingModule } from './shopping-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule, MatIconModule, MatCardModule,
          MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule
        } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';

const MaterialComponentsArray = [ MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
                                  MatDialogModule, MatFormFieldModule, MatInputModule, MatBadgeModule
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
    ShoppingRoutingModule,
    BrowserModule,
    MaterialComponentsArray
  ],
  exports:[MaterialComponentsArray]
})
export class ShoppingModule { }
