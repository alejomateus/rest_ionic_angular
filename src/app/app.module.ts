import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Servicios } from "../providers/servicios/servicios";
import { HttpModule } from '@angular/http';
import {GoogleMaps} from "@ionic-native/google-maps";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { FCM } from '@ionic-native/fcm';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file';
import {Camera} from "@ionic-native/camera";
import {FilePath} from "@ionic-native/file-path";
import {Base64} from "@ionic-native/base64";
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {SocialSharing} from "@ionic-native/social-sharing";
import { Market } from '@ionic-native/market';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BackgroundMode } from '@ionic-native/background-mode';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
        'press': { time: 2000 }  //set press delay for 1 second
      }
    }

    const firebaseAuth={
      apiKey: "AIzaSyCW-8xq7entiACyhefGEPsAcAHbt3xGk_c",
      authDomain: "quaa-d8970.firebaseapp.com",
      databaseURL: "https://quaa-d8970.firebaseio.com",
      projectId: "quaa-d8970",
      storageBucket: "quaa-d8970.appspot.com",
      messagingSenderId: "379027223618"
    };
    @NgModule({
      declarations: [
      MyApp
      ],
      imports: [
      HttpModule,
      BrowserModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(firebaseAuth),
      IonicModule.forRoot(MyApp)
      ],
      bootstrap: [IonicApp],
      entryComponents: [
      MyApp
      ],
      providers: [
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
      ScreenOrientation,
      Market,
      BackgroundMode,
      LocationAccuracy,
      Camera,
      File,
      FilePath,
      Base64,
      FCM,
      StatusBar,
      SplashScreen,
      Geolocation,
      SpeechRecognition,
      Diagnostic,
      GoogleMaps,
      Servicios,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      Network,
      BarcodeScanner,HTTP,
      SQLite,
      InAppBrowser,
      BrowserTab,
      SocialSharing
      ]
    })
    export class AppModule {}
