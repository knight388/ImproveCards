import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MainMenuPage } from '../main-menu/main-menu';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  validations_form: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'email is required' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private menuCtrl: MenuController) {
  }

  enterEmail(value) {
    this.navCtrl.setRoot(MainMenuPage, {
      email: value.email
    });
    if(value.remember){
      this.storage.set('email', value.email);
    } else {
      this.storage.remove('email');
    }
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewWillLoad() {
    this.menuCtrl.enable(false);
    
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])),
      remember: false
    });

    this.storage.get('email').then(val => {
      if(!!val)
        this.validations_form.setValue({'email':val, remember: true});
    })
  }
}
