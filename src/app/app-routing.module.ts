import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomedetailsComponent } from './home/homedetails/homedetails.component';
//import { ShoppingModule } from './shopping/shopping.module';
//import { CookingModule } from './cooking/cooking.module';
import { ChatComponent } from './chat/chat.component';
import { MaterialContactComponent } from './material-contact/material-contact.component';

const routes: Routes = [
{path: '' , redirectTo: '', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {path: 'home/:id', component: HomedetailsComponent},
  { path: 'shopping', loadChildren: './shopping/shopping.module#ShoppingModule' },
  { path: 'cooking', loadChildren: './cooking/cooking.module#CookingModule' },
  { path: 'chat', component: ChatComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'material-contact', component: MaterialContactComponent},
  {path: '**', component: FooterComponent}
];
//ShoppingModule, CookingModule
@NgModule({
  imports: [RouterModule.forRoot(routes  /*, {enableTracing: true }*/)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingModule = [HomeComponent, ChatComponent ,AboutComponent, ContactComponent, HomedetailsComponent,
                              MaterialContactComponent, FooterComponent
                             ];
