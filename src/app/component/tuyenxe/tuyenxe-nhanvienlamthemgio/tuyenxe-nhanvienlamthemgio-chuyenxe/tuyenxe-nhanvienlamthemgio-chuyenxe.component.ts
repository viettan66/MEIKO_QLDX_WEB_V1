import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio-chuyenxe',
  templateUrl: './tuyenxe-nhanvienlamthemgio-chuyenxe.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio-chuyenxe.component.css']
})
export class TuyenxeNhanvienlamthemgioChuyenxeComponent implements OnInit {

  constructor(public rest:RESTService) { }
  start=0;step=50;trangthai='1';ngaytao="false"
  startdate
  enddate
  newdatw=new Date()
  listdata=[]
  async ngOnInit(){
    this.listdata=await this.rest.PostDataToAPI<any[]>({},"DX0060/getall").toPromise()
    console.log(this.listdata)
  }
  getstep($event){ }
  getstart($event){ }
  show(){ }
  huy(){ }
  xoa(){ }
  duyet(){
    console.log(this.startdate)
    console.log(this.enddate)
   }
}
