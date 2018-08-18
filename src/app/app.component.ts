import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { SigninPage } from '../pages/signin/signin';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

const config = {
  apiKey: "AIzaSyBV-6MHkd7KWofztsDE3Al3E1iM1v8-Bmw",
  authDomain: "improv-card.firebaseapp.com",
  databaseURL: "https://improv-card.firebaseio.com",
  projectId: "improv-card",
  storageBucket: "improv-card.appspot.com",
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

