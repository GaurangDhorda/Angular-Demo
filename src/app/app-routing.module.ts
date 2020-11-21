import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomedetailsComponent } from './home/homedetails/homedetails.component';
import { ChatComponent } from './chat/chat.component';
import { MaterialContactComponent } from './material-contact/material-contact.component';
import { MaterialContactListComponent } from './material-contact/material-contact-list/material-contact-list.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { DialogComponent } from './chat/dialog/dialog.component';
import { CreateNewUserComponent } from './chat/create-new-user/create-new-user.component';
import { HomeLineItemComponent } from './home-line-item/home-line-item.component';
import { MapViewComponent } from './map-view/map-view.component';
import { KeyDetectDirective } from './key-detect.directive';

const routes: Routes = [
{path: '' , redirectTo: '', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  {path: 'home/:id', component: HomedetailsComponent},
  { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule) },
  { path: 'cooking', loadChildren: () => import('./cooking/cooking.module').then(m => m.CookingModule) },
  { path: 'chat', component: ChatComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'material-contact', component: MaterialContactComponent},
  {path: 'material-contact-list', component: MaterialContactListComponent},
  {path: '**', component: FooterComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes /*, {enableTracing: true }*/, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
export const routingModuleComponent = [NavComponent, HomeComponent, ChatComponent, AboutComponent, ContactComponent,
                                  HomedetailsComponent, MaterialContactComponent, MaterialContactListComponent, FooterComponent,
                                  HomeLineItemComponent, MapViewComponent, KeyDetectDirective
                                  ];
export const declarationsComponent = [DialogComponent, CreateNewUserComponent, MaterialContactComponent,
                                      ConfirmdialogComponent];
