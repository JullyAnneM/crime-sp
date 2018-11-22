/// <reference types="@types/googlemaps" />
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {geoCodeModel} from "./models/geoCodeModel"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient){}
  title = 'crime-sp';

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  lat = -23.4855167;
  long = -46.503477;
  res: any;
  endereco:string = '';



  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(this.lat,this.long),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  sendAdress(){
    this.http.post<geoCodeModel>("http://localhost:3000/getLatLong", {adress: this.endereco}, httpOptions)
    .subscribe((data: geoCodeModel) => {
      if(data.lat && data.long){
        this.lat = data.lat
        this.long = data.long;
      }
      var mapProp = {
        center: new google.maps.LatLng(this.lat,this.long),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    })
  }
    
}
