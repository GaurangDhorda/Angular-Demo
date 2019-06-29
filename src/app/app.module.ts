import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingModule } from './app-routing.module';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomedetailsComponent } from './home/homedetails/homedetails.component';
import { ChatComponent } from './chat/chat.component';
import { DialogComponent } from './chat/dialog/dialog.component';
import { MaterialContactComponent } from './material-contact/material-contact.component';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material';
import { CreateNewUserComponent } from './chat/create-new-user/create-new-user.component';
// import { AdsenseModule } from 'ng2-adsense';

 //ShoppingModule,
//CookingModule,
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingModule,
    FooterComponent,
    HomedetailsComponent,
    ChatComponent,
    DialogComponent,
    MaterialContactComponent,
    CreateNewUserComponent
  ],
  entryComponents: [
    DialogComponent,
    CreateNewUserComponent
  ],

  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule, //this should be after the BrowsersModule..
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/Angular-Demo/ngsw-worker.js', { enabled: environment.production }),
  //  AdsenseModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private update: SwUpdate, private push: SwPush , private snackbar: MatSnackBar) {
    this.update.available.subscribe( newUpdate => {
      console.log('Update Available');
      // allow user to refresh from snackbar for new update available in PWA..
      const snack =  this.snackbar.open('Voila!, Update available.', 'Update');
      snack.onAction().subscribe( () => {
        window.location.reload();
      });
    });
    this.push.messages.subscribe(msg => {
      this.snackbar.open(JSON.stringify(msg), '', {
        duration: 5000
      });
    });
  }
}
