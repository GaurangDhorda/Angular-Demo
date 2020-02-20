import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomedetailsComponent } from './home/homedetails/homedetails.component';
// import { ShoppingModule } from './shopping/shopping.module';
// import { CookingModule } from './cooking/cooking.module';
import { ChatComponent } from './chat/chat.component';
import { MaterialContactComponent } from './material-contact/material-contact.component';
import { MaterialContactListComponent } from './material-contact/material-contact-list/material-contact-list.component';

const routes: Routes = [
{path: '' , redirectTo: '', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {path: 'home/:id', component: HomedetailsComponent},
  // syntax in angular 8.0 and onwards is..
  // loadChildren: () => import('./shopping/shopping.module').then(shop => shop.ShoppingModule)
  // here loadChildren used for loading shopping module dynamically only when shopping link is clicked,
  // normal way we call component but loadChildren uses when need to Lazy-Load routing module..
  { path: 'shopping', loadChildren: './shopping/shopping.module#ShoppingModule' },
  { path: 'cooking', loadChildren: './cooking/cooking.module#CookingModule' },
  { path: 'chat', component: ChatComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'material-contact', component: MaterialContactComponent},
  {path: 'material-contact-list', component: MaterialContactListComponent},
  {path: '**', component: FooterComponent}
];
// ShoppingModule, CookingModule
@NgModule({
  // there are two routing strategy 1. default is html5 based PathRouting is useful for server side rendering too,
  // 2. is HashPath strategy, putting hash url and loads pages from client side rather going to server-side rendering.
  imports: [RouterModule.forRoot(routes /* , { useHash: true } , {enableTracing: true }*/)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingModule = [HomeComponent, ChatComponent, AboutComponent, ContactComponent, HomedetailsComponent,
                              MaterialContactComponent, MaterialContactListComponent, FooterComponent
                             ];
