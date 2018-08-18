import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Platform } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  title: string;
  data = { type: '', email: '', message: '' };
  users = [];
  roomkey: string;
  userkey: string;
  email: string;
  offStatus: boolean = false;
  creater: string;
  player: string;
  picnums: any[];
  picno: any;
  assetImg: string;
  usersRef: firebase.database.Reference;
  picnumsRef: firebase.database.Reference;
  picnoRef: firebase.database.Reference;
  playerRef: firebase.database.Reference;
  isFirst = true;

  public unregisterBackButtonAction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, private platform: Platform) {
    this.roomkey = this.navParams.get("key") as string;
    this.email = this.navParams.get("email") as string;
    this.data.type = 'message';
    this.data.email = this.email;
    this.title = "ImprovCard (Team: " + this.navParams.get("roomname") as string + ")";
    this.usersRef = firebase.database().ref('chatrooms/' + this.roomkey + '/users');
    this.picnumsRef = firebase.database().ref('chatrooms/' + this.roomkey + '/picnums');
    this.picnoRef = firebase.database().ref('chatrooms/' + this.roomkey + '/picno');
    this.playerRef = firebase.database().ref('chatrooms/' + this.roomkey + '/player');


    this.picnumsRef.on('value', snap => {
      this.picnums = snap.val();

    });

    this.picnoRef.on('value', snap => {
      this.picno = snap.val();
      this.assetImg = "assets/imgs/cards/" + this.picnums[this.picno] + ".png";
    });

    this.playerRef.on('value', snap => {
      this.player = snap.val();
    })


    this.usersRef.on('value', resp => {
      this.users = [];
      this.users = snapshotToArray(resp);
      this.users.sort((a, b)=>{
        let textA = a.user.toUpperCase();
        let textB = b.user.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1: 0;
      })
      let playerExist = false;
      for (let user of this.users) {
        if (user.user === this.player) {
          playerExist = true; break;
        }
      }
      if ((this.users.length == 1 && this.users[0].user === this.email && this.isFirst) || !playerExist) {
        try {
          this.isFirst = false;
          this.playerRef.set(this.users[0].user);
          this.picnoRef.set((this.picno + 1) % this.picnums.length);
        }
        catch{

        }
      }
    });

    let joinData = this.usersRef.push();
    joinData.set({
      user: this.email,
      sendDate: Date()
    });
    this.userkey = joinData.key;



    firebase.database().ref('chatrooms/' + this.roomkey + '/users/' + this.userkey).onDisconnect().remove();

    if (this.platform.is('cordova'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.email,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    try {
      this.usersRef.off();
      this.picnumsRef.off();
      this.picnoRef.off();
      this.playerRef.off();
      firebase.database().ref('chatrooms/' + this.roomkey + '/users/' + this.userkey).remove();
      if (this.player === this.email) this.passStory();

    } catch (error) {
    } finally {
      this.navCtrl.setRoot(RoomPage, {
        email: this.email
      });
      if (this.platform.is('mobile'))
        this.screenOrientation.unlock();
    }
  }

  finishStory() {
    this.passStory();
    this.picnoRef.set((this.picno + 1) % this.picnums.length);
  }

  passStory() {
    let playerIndex = this.users.findIndex(user => { return user.key === this.userkey; });
    playerIndex = (playerIndex + 1) % this.users.length;
    this.playerRef.set(this.users[playerIndex].user);
  }

  ionViewWillLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      alert('prevent back button');
    })
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
