import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddRoomPage} from '../add-room/add-room';
import {HomePage} from '../home/home';
import * as firebase from 'firebase';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let now = Date.now();
    let cutoff = now - 1 * 60 * 60 * 24 * 1000;
    let old = this.ref.orderByChild('createdDate').endAt(cutoff).limitToLast(1);
    old.once('child_added', snap=>{
      snap.ref.remove();
    })
    
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    })
    console.log(this.navParams)
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage, {
      email: this.navParams.get('email')
    });
  }

  deleteRoom(key) {
    this.ref.child(key).remove();
  }

  joinRoom(key, roomname) {
    this.ref.off();
    this.navCtrl.setRoot(HomePage, {
      key:key,
      roomname:roomname,
      email: this.navParams.get('email')
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}
