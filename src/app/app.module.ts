import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicStorageModule } from '@ionic/storage'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { RoomPage } from '../pages/room/room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { WelcomePage } from '../pages/welcome/welcome';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { HappinessDoorPage } from '../pages/happiness-door/happiness-door';
import { HappinessPostPage } from '../pages/happiness-post/happiness-post';
import { DirectivesModule } from '../directives/directives.module';
import { KudoCardsPageModule } from '../pages/kudo-cards/kudo-cards.module';
import { HappinessDoorHelpPage } from '../pages/happiness-door-help/happiness-door-help';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    RoomPage,
    AddRoomPage,
    WelcomePage,
    MainMenuPage,
    HappinessDoorPage,
    HappinessPostPage,
    HappinessDoorHelpPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KudoCardsPageModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    RoomPage,
    AddRoomPage,
    WelcomePage,
    MainMenuPage,
    HappinessDoorPage,
    HappinessPostPage,
    HappinessDoorHelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenOrientation,
    LoginProvider,
  ]
})
export class AppModule {}
