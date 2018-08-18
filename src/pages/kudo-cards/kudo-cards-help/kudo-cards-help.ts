import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the KudoCardsHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kudo-cards-help',
  templateUrl: 'kudo-cards-help.html',
})
export class KudoCardsHelpPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KudoCardsHelpPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
