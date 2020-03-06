import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '@employee/employee.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceWorkerModule.register('/Angular-Demo/ngsw-worker.js', { enabled: environment.production }),
  ],
  exports:[
    ServiceWorkerModule
  ]
})
export class ServicesWorkersModule { 
  constructor(private update: SwUpdate, private push: SwPush , private snackbar: MatSnackBar, private service: EmployeeService) {
    this.update.available.subscribe( newUpdate => {
      console.log('Update Available');
      // allow user to refresh from snackbar for new update available in PWA..
      const snack =  this.snackbar.open('Voila!, Update available.', 'Update');
      snack.onAction().subscribe( () => {
        window.location.reload();
      });
    });
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
