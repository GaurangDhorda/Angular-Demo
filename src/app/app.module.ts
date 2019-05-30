import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingModule } from './app-routing.module';
import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ShoppingModule } from './shopping/shopping.module';
import { CookingModule } from './cooking/cooking.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HomedetailsComponent } from './home/homedetails/homedetails.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingModule,
    FooterComponent,
    HomedetailsComponent,
    ChatComponent,
  ],

  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingModule,
    CookingModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
