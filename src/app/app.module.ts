import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/map.service';
import { PopupService } from './services/popup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LayersComponent } from './layers/layers.component';

@NgModule({
  declarations: [AppComponent, MapComponent, LayersComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MarkerService, PopupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
