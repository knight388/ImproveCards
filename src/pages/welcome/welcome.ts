import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  rootPage:any = RoomPage;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = {email:this.navParams.get('email')};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
