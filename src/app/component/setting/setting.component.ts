import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { Router } from '@angular/router';
import { SettingDiadanhComponent } from './setting-diadanh/setting-diadanh.component';
import { SettingDiadiemComponent } from './setting-diadiem/setting-diadiem.component';
import { SettingKhungthoigianComponent } from './setting-khungthoigian/setting-khungthoigian.component';
import { SettingXebusComponent } from './setting-xebus/setting-xebus.component';
import { SettingLotrinhtaxiComponent } from './setting-lotrinhtaxi/setting-lotrinhtaxi.component';
import { SettingThetaxiComponent } from './setting-thetaxi/setting-thetaxi.component';
import { SettingthongtintrangchuComponent } from './settingthongtintrangchu/settingthongtintrangchu.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(public rest:RESTService,public router:Router) { }
hhh
  listtab=[
          //  {label:"Địa danh",classs:'fad fa-globe-americas'}
          // ,{label:'Dịa điểm',classs:'fad fa-map-marked-alt'}
          // ,{label:'Khung thời gian',classs:'fad fa-calendar-plus'}
          // ,{label:'Xe bus',classs:'fad fa-shuttle-van'}
          // ,{label:'Lộ trình taxi',classs:'fa fa-map-signs'}
          // ,{label:'Thẻ taxi',classs:'fad fa-credit-card'}
          // //,{label:'Điểm đón taxi',classs:'fad fa-cars'}
          ]
  // tab=0;
  ngOnInit(): void {
    this.listtab=this.rest.getmenu("QLDX_SETTING")
    
    let k=this.router.url
    switch (k) {
      case '/SETTING':
        this.hhh = SettingDiadanhComponent
        break
      case '/SETTING/DIADANH':
        this.hhh = SettingDiadanhComponent
        break
      case '/SETTING/DIADIEM':
        this.hhh = SettingDiadiemComponent
        break
      case '/SETTING/KTG':
        this.hhh = SettingKhungthoigianComponent
        break
      case '/SETTING/BUS':
        this.hhh = SettingXebusComponent
        break
      case '/SETTING/ROUTE':
        this.hhh = SettingLotrinhtaxiComponent
        break
      case '/SETTING/CARD':
        this.hhh = SettingThetaxiComponent
        break
      case '/SETTING/NEW':
        this.hhh = SettingthongtintrangchuComponent
        break
    }
  } 
}
