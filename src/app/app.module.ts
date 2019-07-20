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
import { DialogComponent } from './chat/dialog/dialog.component';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material';
import { CreateNewUserComponent } from './chat/create-new-user/create-new-user.component';
// import { AdsenseModule } from 'ng2-adsense';
import { AgmCoreModule } from '@agm/core';
import { MaterialContactComponent } from './material-contact/material-contact.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';

 //ShoppingModule,
//CookingModule,
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingModule,
    DialogComponent,
    CreateNewUserComponent,
    ConfirmdialogComponent
  ],
  entryComponents: [
    DialogComponent,
    CreateNewUserComponent,
    MaterialContactComponent,
    ConfirmdialogComponent
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
    AgmCoreModule.forRoot({
      // used for adding maps functionality..
      apiKey: 'AIzaSyBg34I4bCxMwjU9YYJz7kibwanbFIR_9sw'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
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
