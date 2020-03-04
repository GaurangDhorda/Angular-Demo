import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// user defined modules...
import { MaterialModule } from '@materialmodule/material.module';
import {FirebaseModule} from './firebase/firebase.module';
import { ServicesWorkersModule } from './services-workers/services-workers.module';
import { AgmCoreCustomModule } from './agm-core/agm-core.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
    ServicesWorkersModule,
    AgmCoreCustomModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
    ServicesWorkersModule,
    AgmCoreCustomModule
  ]
})
export class CoreModule {
}
