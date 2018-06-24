import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
import { Park } from '../../app/interfaces/park';
import { query } from '@angular/core/src/animation/dsl';
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: Array<Park> = [];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {
    parkData.getParks().then(parks => {
      this.parks = parks;
    });
  }

  goParkDetails(theParkData){
    this.navCtrl.push('ParkDetailsPage',{parkData:theParkData});
    
  }

  getParks(event){
    //Reset items back to all items
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    });

    //Set queryString to the value of searchBar
    let queryString = event.target.value;

    if(queryString !== undefined){
      //if value is empty string then dont filter the items
      if(queryString.trim() == ''){
        return;
      }

      this.parkData.getFilteredParks(queryString).then(theResult => {
        this.parks = theResult;
      });
    }
  }

  resetList(event){
    //Reset Items back to all Items
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    });
  }


}
