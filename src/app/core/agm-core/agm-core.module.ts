import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      // used for adding maps functionality..
      apiKey: 'AIzaSyBg34I4bCxMwjU9YYJz7kibwanbFIR_9sw'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
  ],
  exports : [AgmCoreModule]
})
export class AgmCoreCustomModule {
 }
