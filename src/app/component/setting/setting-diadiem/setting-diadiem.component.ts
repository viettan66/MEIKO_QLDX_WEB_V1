import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-diadiem',
  templateUrl: './setting-diadiem.component.html',
  styleUrls: ['./setting-diadiem.component.css']
})
export class SettingDiadiemComponent implements OnInit {

  constructor() { }
tab=1
listtab=[
  {label:'Địa điểm',classs:'fad fa-map-marker-alt'},
  {label:'Tuyến xe',classs:'fad fa-route'},
  {label:'Bản đồ',classs:'fad fa-map-marked-alt'},
]
  ngOnInit(): void {
  }
  gettab($event){
    this.tab=$event
  }
}
