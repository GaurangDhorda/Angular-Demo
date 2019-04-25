import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomedetailsComponent } from './home/homedetails/homedetails.component';
import { ShoppingModule } from './shopping/shopping.module';
import { ShoppingTopbarComponent } from './shopping/shopping-topbar/shopping-topbar.component';


const routes: Routes = [
{path: '' , redirectTo: '', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {path: 'home/homedetails/:id', component: HomedetailsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  {path: '**', component: FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ShoppingModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingModule = [HomeComponent, AboutComponent, ContactComponent, HomedetailsComponent ,
                              FooterComponent ];