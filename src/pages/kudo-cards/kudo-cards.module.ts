import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KudoCardsPage } from './kudo-cards';
import { KudoCardsListPage } from './kudo-cards-list/kudo-cards-list';
import { KudoCardsPostPage } from './kudo-cards-post/kudo-cards-post';
import { DirectivesModule } from '../../directives/directives.module';
import { KudoCardsHelpPage } from './kudo-cards-help/kudo-cards-help';

@NgModule({
  declarations: [
    KudoCardsPage,
    KudoCardsListPage,
    KudoCardsPostPage,
    KudoCardsHelpPage
  ],
  imports: [
    IonicPageModule.forChild(KudoCardsPage),
    DirectivesModule
  ],
  entryComponents: [
    KudoCardsPage,
    KudoCardsListPage,
    KudoCardsPostPage,
    KudoCardsHelpPage
  ],
  exports:[
    KudoCardsPage
  ]
})
export class KudoCardsPageModule {}
