import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './pipes/search.pipe';

const firebaseConfig = {
    apiKey: "AIzaSyAzSYJHmOeMcHnbU4sZdXpCsHxab1BtFWo",
    authDomain: "kwarantannaapp-f8a61.firebaseapp.com",
    databaseURL: "https://kwarantannaapp-f8a61.firebaseio.com",
    projectId: "kwarantannaapp-f8a61",
    storageBucket: "gs://kwarantannaapp-f8a61.appspot.com",
    messagingSenderId: "283880997313",
    appId: "1:283880997313:web:863b474af5d437ca4b2f40",
    measurementId: "G-GTE22XNX4Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export let isAuthenticated = false;

export function authenticate() {
    isAuthenticated = true;
}

@NgModule({
  declarations: [AppComponent, SearchPipe],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
      Camera,
      Geolocation,
      StatusBar,
      SplashScreen,
      SearchPipe,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
