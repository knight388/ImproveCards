import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { RoomPage } from '../room/room';
import { HappinessDoorPage } from '../happiness-door/happiness-door';
import { SigninPage } from '../signin/signin';
import { KudoCardsPage } from '../kudo-cards/kudo-cards';

/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  @ViewChild(Nav) navCtrl: NavController;
  rootPage:any = WelcomePage;
  roomPage: any = RoomPage;
  data: any;
  alias: string;
  username: string[];
  rangeValue: string;
  constructor(public navParams: NavParams) {
    this.data = {email:this.navParams.get('email')};
    this.username = this.data.email.split('@')[0].split('.');
    this.alias = '';
    this.username.forEach(letter => {
      this.alias += letter[0];
    });
    this.rangeValue = "20";
  }

  gotoImprovPlay() {
    this.navCtrl.setRoot(RoomPage, this.data);
  }

  gotoHappinessDoor() {
    this.navCtrl.setRoot(HappinessDoorPage);
  }

  gotoWelcome() {
    this.navCtrl.setRoot(WelcomePage);
  }

  gotoKudoCards() {
    this.navCtrl.setRoot(KudoCardsPage);
  }

  signout() {
    this.navCtrl.setRoot(SigninPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }
}
