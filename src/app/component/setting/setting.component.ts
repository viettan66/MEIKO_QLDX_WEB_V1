import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor() { }

  listtab=[
           {label:"Địa danh",classs:'fad fa-globe-americas'}
          ,{label:'Dịa điểm',classs:'fad fa-map-marked-alt'}
          ,{label:'Khung thời gian',classs:'fad fa-calendar-plus'}
          ,{label:'Xe bus',classs:'fad fa-shuttle-van'}
          ,{label:'Lộ trình taxi',classs:'fa fa-map-signs'}
          //,{label:'Thẻ taxi',classs:'fad fa-credit-card'}
          //,{label:'Điểm đón taxi',classs:'fad fa-cars'}
          ]
  tab=1;
  ngOnInit(): void {
  }
  gettab($event){
    this.tab=$event
  }


}
