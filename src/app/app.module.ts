import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingModuleComponent, declarationsComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    routingModuleComponent,
    declarationsComponent
  ],
  entryComponents: [
    declarationsComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    LayoutModule,
    BrowserAnimationsModule, //this should be after the BrowsersModule..
    AppRoutingModule,
    RouterModule,
    CoreModule
  ],
  bootstrap : [AppComponent]
})
export class AppModule {
}
