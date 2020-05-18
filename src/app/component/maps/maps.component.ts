import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
       "featureType": "poi",
       "stylers": [{
          "visibility": "off" }]
    }],
    center:new google.maps.LatLng(  21.0074345,
         105.6289213)
  }
  markers = []
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }
point: google.maps.LatLng
  click(event: google.maps.MouseEvent) {
   this.point=new google.maps.LatLng(event.latLng.lat(),event.latLng.lng())
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    this.markers.push({
      position: this.point,
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      
      options: {
        animation: google.maps.Animation.DROP,draggable: true,
        
      },
    })
  }

  openInfo(marker: MapMarker, mar) {
    this.infoContent = mar.info
    this.info.open(marker)
    console.log("lat:"+mar.position.lat()+" | lng:"+mar.position.lng())
  }
  mapDragend($event, marker: MapMarker){
    marker.position.lat=$event.latitude
    marker.position.lng=$event.longitude
  }
} 
