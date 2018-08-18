import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import Chance from 'chance';
let chance = new Chance((new Date()).getTime());
/**
 * Generated class for the AddRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {

  validations_form: FormGroup;
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  }

  addRoom(value) {

    let newData = this.ref.push();
    newData.set({
      roomname:value.roomname,
      creater:this.navParams.get('email'),
      users: [],
      createdDate: new Date().getTime(),
      picnums:chance.unique(chance.natural, 34, { min: 1, max: 34 }),
      picno:Math.abs(chance.integer()) % 34 + 1
    });

    this.navCtrl.pop();
  }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      roomname: new FormControl('', Validators.required)
    });
  }

  validation_messages = {
    'roomname': [
      { type: 'required', message: 'Teamname is required.' }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

}
