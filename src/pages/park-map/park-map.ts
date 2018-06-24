import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
import { Park } from '../../app/interfaces/park';
@Component({
  selector: 'page-park-map',
  templateUrl: 'park-map.html'
})
export class ParkMapPage {
  map: google.maps.Map;
  parks: Array<Park> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public parkData:ParkData) {
    this.map = null;
  }

  ionViewDidLoad() {
    this.platform.ready().then( () =>{
      this.initializeMap();
    });
  }

  initializeMap(){
    let minZoomLevel = 3;
    this.map = new google.maps.Map(document.getElementById("map_canvas"),{
      zoom: minZoomLevel,
      center: new google.maps.LatLng(39.833, -98.583),
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let image = 'assets/img/nps_arrowhead.png';
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;

      for(let thePark of this.parks){
        let parkPos: google.maps.LatLng = new google.maps.LatLng(thePark.lat, thePark.long);
        let parkMarker: google.maps.Marker = new google.maps.Marker();
        parkMarker.setPosition(parkPos);
        parkMarker.setMap(this.map);
        parkMarker.setIcon(image);

      }

    });

  }

}
