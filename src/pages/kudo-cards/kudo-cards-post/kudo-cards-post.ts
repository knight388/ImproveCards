import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as firebase from 'firebase';
import { KudoCardsPage } from '../kudo-cards';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { KudoCardsHelpPage } from '../kudo-cards-help/kudo-cards-help';

/**
 * Generated class for the KudoCardsPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kudo-cards-post',
  templateUrl: 'kudo-cards-post.html',
})
export class KudoCardsPostPage {

  validations_form: FormGroup;
  validation_messages = {
    'recipientEmail': [
      { type: 'required', message: 'RecipientEmail Required'},
      { type: 'pattern', message: 'Enter a valid email.'}
    ],
    'kudotext': [
      { type: 'required', message: 'Please write kudo feedback'}
    ]
  }
  card: any;
  kudotext: string;
  recipientEmail: string;
  ref = firebase.database().ref('kudocards/');
  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, private platform: Platform, private formBuilder: FormBuilder, private modalCtrl: ModalController) {
  }

  goToHelp() {
    this.modalCtrl.create(KudoCardsHelpPage).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KudoCardsPostPage');
  }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      recipientEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])),
      kudotext: new FormControl('', Validators.required)
    });

    this.card = this.navParams.data.card;
    console.log(this.card);
    if (this.platform.is('cordova') && this.platform.is('mobile'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewWillLeave() {
    if (this.platform.is('cordova') && this.platform.is('mobile'))
      this.screenOrientation.unlock();
  }

  postKudoCard() {
    let newKudoCard = this.ref.push();
    newKudoCard.set({
      recivemail: this.recipientEmail,
      kudotitle: this.card.title,
      kudotext: this.kudotext,
      postDate: new Date().getTime()
    });

    this.navCtrl.setRoot(KudoCardsPage);

  }

}
