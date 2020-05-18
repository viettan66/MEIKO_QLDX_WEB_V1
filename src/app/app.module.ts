import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsComponent } from './component/maps/maps.component';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AgmCoreModule.forRoot({
    //     apiKey: "AIzaSyCxZsV5rKaX6AToaAR7w_RpDr20c6biQUA",
    //     libraries: ["places", "geometry"]
    // })
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
