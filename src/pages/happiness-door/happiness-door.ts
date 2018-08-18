import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HappinessPostPage } from '../happiness-post/happiness-post';
import * as firebase from 'firebase';
import { HappinessDoorHelpPage } from '../happiness-door-help/happiness-door-help';

/**
 * Generated class for the HappinessDoorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-happiness-door',
  templateUrl: 'happiness-door.html',
})
export class HappinessDoorPage {

  ref: firebase.database.Reference;
  data: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.ref = firebase.database().ref('happiness/');
  }

  ionViewWillEnter() {
    let now = Date.now();
    let cutoff = now - 1 * 60 * 60 * 24 * 1000;
    let old = this.ref.orderByChild('postDate').endAt(cutoff).limitToLast(1);
    old.once('child_added', snap=>{
      snap.ref.remove();
    })
    this.ref.on('value', snap => {
      this.data = snapshotToArray(snap);
      this.data.reverse();
      console.log(this.data)
    });
  }

  ionViewWillLeave() {
    this.ref.off();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappinessDoorPage');
  }

  toLocalTimeString (dateStr): string  {
    return new Date(dateStr).toString();
  }

  

  happinessImage(imgName) {
    return `assets/imgs/happiness/${ imgName}.jpg`
  }

  gotoHappinessPost() {
    this.navCtrl.push(HappinessPostPage);
  }

  goToHelp() {
    this.modalCtrl.create(HappinessDoorHelpPage).present();
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
};
