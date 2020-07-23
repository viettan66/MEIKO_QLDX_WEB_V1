import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import * as Global from '../../../Service/global'
declare var $:any
@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio',
  templateUrl: './tuyenxe-nhanvienlamthemgio.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio.component.css']
})
export class TuyenxeNhanvienlamthemgioComponent implements OnInit {

  constructor(public rest:RESTService) { }

  listtab=[{label:"Duyệt đơn",classs:'fad fa-check'}
          ,{label:'Sắp xe',classs:'fad fa-random'}
          ,{label:'Chuyến xe taxi',classs:'fad fa-chart-network'}
        ]
  tab=999;
  loading=true
  pending=false
  gettab($event){
    if(this.pending==true){
      if(!confirm(`Có công việc đang thực hiện chưa xong, xác nhận đổi tab?`)){
        return false
      }
    }
    this.tab=$event
    this.pending=false
  }
  getpending(f){
    this.pending=f
  }
  async ngOnInit() {
    let data=await this.rest.Get<any>(Global.APIGetDon+'all').toPromise()
    ////console.log(data)
   let result=await this.rest.PostDataToAPI<any[]>(data.data.filter(c=>c.maForm='SF015'),'DX0001/addsapca').toPromise();
   ////console.log(result)
    result.filter(c=>c.code==="EXIST"||c.code==="OK").map(async x=>{
      let data2=await this.rest.Get<any>(Global.APIUpdateDon+x.data.A0028_ID).toPromise()
      ////console.log(data2)
    })
    this.loading=false
    this.tab=1
  }
}