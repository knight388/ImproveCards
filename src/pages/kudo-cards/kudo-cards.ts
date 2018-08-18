import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { KudoCardsListPage } from './kudo-cards-list/kudo-cards-list';
import * as firebase from 'firebase';
import { KudoCardsHelpPage } from './kudo-cards-help/kudo-cards-help';

/**
 * Generated class for the KudoCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kudo-cards',
  templateUrl: 'kudo-cards.html',
})
export class KudoCardsPage {
  
  kudocards: any[];
  ref = firebase.database().ref('kudocards/');
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.ref.on('value', resp=>{
      this.kudocards = [];
      this.kudocards = snapshotToArray(resp);
    });
  }

  goToKudoCardsList() {
    this.navCtrl.push(KudoCardsListPage);
  }

  goToHelp() {
    this.modalCtrl.create(KudoCardsHelpPage).present();
  }

  toLocalTimeString (dateStr): string  {
    return new Date(dateStr).toDateString();
  }

  ionViewWillLoad() {
    
  }

  ionViewWillLeave() {
    this.ref.off();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KudoCardsPage');
  }

}

const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}
