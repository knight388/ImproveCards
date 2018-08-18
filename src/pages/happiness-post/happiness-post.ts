import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HappinessDoorHelpPage } from '../happiness-door-help/happiness-door-help';
/**
 * Generated class for the HappinessPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-happiness-post',
  templateUrl: 'happiness-post.html',
})
export class HappinessPostPage {

  @ViewChild('fixedContent') fixedContent:Content;

  happiness: string;
  eventopt: string;
  feedback: string;
  ref = firebase.database().ref('happiness/');
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.happiness = 'happy';
    this.feedback = '';
    this.eventopt = 'false';
  }

  changeText() {
    
    this.fixedContent.scrollToBottom();
  }

  postFeedback(){
    let newData = this.ref.push();
    newData.set({
      happiness: this.happiness,
      eventopt: this.eventopt !== 'false' ? this.eventopt : '',
      feedback: this.feedback,
      postDate: new Date().getTime()
    });

    this.navCtrl.pop();
  }

  goToHelp() {
    this.modalCtrl.create(HappinessDoorHelpPage).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappinessPostPage');
  }

}
