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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateNewUserComponent } from './chat/create-new-user/create-new-user.component';
// import { AdsenseModule } from 'ng2-adsense';
import { AgmCoreModule } from '@agm/core';
import { MaterialContactComponent } from './material-contact/material-contact.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { EmployeeService } from './employee.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
    HttpClientModule,
    AppRoutingModule,
    MatCheckboxModule,
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
  constructor(private update: SwUpdate, private push: SwPush , private snackbar: MatSnackBar, private service: EmployeeService) {
    this.update.available.subscribe( newUpdate => {
      console.log('Update Available');
      // allow user to refresh from snackbar for new update available in PWA..
      const snack =  this.snackbar.open('Voila!, Update available.', 'Update');
      snack.onAction().subscribe( () => {
        window.location.reload();
      });
    });
    
    /*this.push.messages.subscribe(msg => {
      this.snackbar.open(JSON.stringify(msg), '', {
        duration: 5000
      });
    });*/
    
    const key = 'BGeXc0b2Tfiro0K5KnSdjKMOzLhTBWW9kZ14iA2i6UTUOk0KroXM8945nj_D9jq9qj74c6Ul7sXLCc1QdKDiuL8';
    this.push.requestSubscription({
        serverPublicKey: key 
      }).then(pushSubcription => {
           console.log(pushSubcription.toJSON());
           this.service.postSubscriptions(pushSubcription).subscribe();
      }).catch (err => {
        console.log('could not subscribe to notification' + err);
      });
  }
}
