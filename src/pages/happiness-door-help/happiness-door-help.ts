import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HappinessDoorHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-happiness-door-help',
  templateUrl: 'happiness-door-help.html',
})
export class HappinessDoorHelpPage {

  constructor(private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappinessDoorHelpPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
