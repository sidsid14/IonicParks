import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: Array<Object> = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {
    parkData.getParks().then(parks => {
      this.parks = parks;
    });
  }

  goParkDetails(theParkData){
    this.navCtrl.push('ParkDetailsPage',{parkData:theParkData});
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }

}
