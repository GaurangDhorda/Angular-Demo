import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingTopbarComponent } from './shopping-topbar/shopping-topbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    {path: '', component: ShoppingTopbarComponent,
    children: [
        {
            path: '',
            component: ProductListComponent
        },
        {path: 'product-details/:productId', component: ProductDetailsComponent},
        {path: 'cart', component: CartComponent}
    ]
}];

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ShoppingRoutingModule { }
export const shoppingRoutingModule = [ ShoppingTopbarComponent, CartComponent, ProductListComponent,
                                        ProductAlertsComponent, ProductDetailsComponent
                                     ];
