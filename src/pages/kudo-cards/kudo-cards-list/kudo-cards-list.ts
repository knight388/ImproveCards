import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { KudoCardsPostPage } from '../kudo-cards-post/kudo-cards-post';
import { KudoCardsHelpPage } from '../kudo-cards-help/kudo-cards-help';

/**
 * Generated class for the KudoCardsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kudo-cards-list',
  templateUrl: 'kudo-cards-list.html',
})
export class KudoCardsListPage {

  cardsList : any[] = [
    {
      title: 'CONGRATULATIONS!',
      color: 'green',
      img: 'congratulations.png'
    },
    {
      title: 'THANK YOU!',
      color: 'red',
      img: 'thankyou.png'
    },
    {
      title: 'VERY HAPPY!',
      color: 'blue',
      img: 'veryhappy.png'
    },
    {
      title: 'MANY THANKS!',
      color: 'yellow',
      img: 'manythanks.png'
    },
    {
      title: 'WELL DONE!',
      color: 'brown',
      img: 'welldone.png'
    },
    {
      title: 'GREAT JOB!',
      color: 'pink',
      img: 'greatjob.png'
    },
    {
      title: 'TOTALLY AWESOME!',
      color: 'purple',
      img: 'totalawesome.png'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  kudoImagePath(imgName): string {
    return `assets/imgs/kudo_cards/${imgName}`;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KudoCardsListPage');
  }

  gotoKudoPost(card) {
    this.navCtrl.push(KudoCardsPostPage, {card});
  }

  goToHelp() {
    this.modalCtrl.create(KudoCardsHelpPage).present();
  }

}
