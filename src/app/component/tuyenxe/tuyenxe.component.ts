import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import * as Global from '../../Service/global'

@Component({
  selector: 'app-tuyenxe',
  templateUrl: './tuyenxe.component.html',
  styleUrls: ['./tuyenxe.component.css']
})
export class TuyenxeComponent implements OnInit {

  constructor(public rest:RESTService) { }
  loading=true
  listdon=[]
  listtab=[
    // {label:"Điểm đón",classs:'fad fa-map-marked-alt'},
  {label:'Thống kê nhân viên',classs:'fad fa-file-chart-line'}
  ,{label:'Nhân viên đăng ký mới',classs:'fad fa-paper-plane'}
  ,{label:'Nhân viên làm thêm giờ',classs:'fad fa-taxi'}
  ,{label:'Xe đi công tác',classs:'fad fa-car-building'}
]
  tab=999;
  async ngOnInit(){
    let data=await this.rest.Get<any>(Global.APIGetDon+'all').toPromise()
    console.log(data)
   let result=await this.rest.PostDataToAPI<any[]>(data.data,'DX0001/add').toPromise();
   console.log(result)
    
    this.loading=false
    this.tab=2
  }

  gettab($event){
    this.tab=$event
  }
}
