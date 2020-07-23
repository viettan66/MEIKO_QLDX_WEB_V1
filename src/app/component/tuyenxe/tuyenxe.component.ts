import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { TuyenxeNhanviendangkyComponent } from './tuyenxe-nhanviendangky/tuyenxe-nhanviendangky.component';
import { Router } from '@angular/router';
import { TuyenxeNhanvienlamthemgioChuyenxeComponent } from './tuyenxe-nhanvienlamthemgio/tuyenxe-nhanvienlamthemgio-chuyenxe/tuyenxe-nhanvienlamthemgio-chuyenxe.component';
import { TuyenxeNhanvienlamthemgioComponent } from './tuyenxe-nhanvienlamthemgio/tuyenxe-nhanvienlamthemgio.component';
import { TuyenxeNhanviendicongtacComponent } from './tuyenxe-nhanviendicongtac/tuyenxe-nhanviendicongtac.component';
import { DanhsachnhanviendixeComponent } from './danhsachtuyenxe/danhsachnhanviendixe/danhsachnhanviendixe.component';
import { DanhsachtuyenxeComponent } from './danhsachtuyenxe/danhsachtuyenxe.component';
import { TuyenxeQuanlythanhtoanComponent } from './tuyenxe-quanlythanhtoan/tuyenxe-quanlythanhtoan.component';

@Component({
  selector: 'app-tuyenxe',
  templateUrl: './tuyenxe.component.html',
  styleUrls: ['./tuyenxe.component.css']
})
export class TuyenxeComponent implements OnInit {

  constructor(public rest:RESTService,public router:Router) { }
  loading=true
  hhh
  listdon=[]
  listtab=[
    // {label:"Điểm đón",classs:'fad fa-map-marked-alt'},
  // {label:'Nhân viên đăng ký',classs:'fad fa-paper-plane',routerlink:'/TUYENXE/NVDK'}
  // ,{label:'Nhân viên làm thêm giờ',classs:'fad fa-taxi',routerlink:'/TUYENXE/NVLTG'}
  // ,{label:'Xe đi công tác',classs:'fad fa-car-building',routerlink:'/TUYENXE/XCT'}
  // ,{label:'Thống kê nhân viên',classs:'fad fa-file-chart-line',routerlink:'/TUYENXE/TKVN'}
  // ,{label:'Quản lý thanh toán',classs:'fad fa-usd-circle',routerlink:'/TUYENXE/QLTT'}
]
  tab=999;
  async ngOnInit(){
this.listtab=this.rest.getmenu('QLDX_TUYENXE')

    let k=this.router.url
    switch (k) {
      case '/TUYENXE':
        this.hhh = TuyenxeNhanvienlamthemgioComponent
        break
      case '/TUYENXE/NVLTG':
        this.hhh = TuyenxeNhanvienlamthemgioComponent
        break
      case '/TUYENXE/NVDK':
        this.hhh = TuyenxeNhanviendangkyComponent
        break
      case '/TUYENXE/XCT':
        this.hhh = TuyenxeNhanviendicongtacComponent
        break
      case '/TUYENXE/TKVN':
        this.hhh = DanhsachtuyenxeComponent
        break
      case '/TUYENXE/QLTT':
        this.hhh = TuyenxeQuanlythanhtoanComponent
        break
    }
    // if(k=='/TUYENXE/NVLTG'){
    //     this.hhh=TuyenxeNhanvienlamthemgioComponent
    // }
    // if(k=='/TUYENXE/NVDK'){
    //    this.hhh=TuyenxeNhanviendangkyComponent
    // }
    // if(k=='/TUYENXE/XCT'){
    //    this.hhh=TuyenxeNhanviendicongtacComponent
    // }
    // if(k=='/TUYENXE/TKVN'){
    //    this.hhh=DanhsachtuyenxeComponent
    // }
    // if(k=='/TUYENXE/QLTT'){
    //    this.hhh=TuyenxeQuanlythanhtoanComponent
    // }
       
    
  }

  // gettab($event){
  //   this.tab=$event
  // }
}
