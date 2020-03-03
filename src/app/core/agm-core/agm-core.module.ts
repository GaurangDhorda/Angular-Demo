import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';


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
  ]
})
export class AgmCoreCustomModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AgmCoreCustomModule,
      providers : [AgmCoreCustomModule]
    }
  }
 }
