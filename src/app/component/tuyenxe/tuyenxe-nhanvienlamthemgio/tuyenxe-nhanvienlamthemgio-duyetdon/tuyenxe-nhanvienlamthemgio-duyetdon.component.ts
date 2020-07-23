import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { ToastrService } from 'ngx-toastr';
declare var $:any

@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio-duyetdon',
  templateUrl: './tuyenxe-nhanvienlamthemgio-duyetdon.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio-duyetdon.component.css']
})
export class TuyenxeNhanvienlamthemgioDuyetdonComponent implements OnInit {

  constructor(public rest:RESTService,public toasts:ToastrService) { }
listdata=[]
trangthai='1'
ngaytao='false'
  async ngOnInit() {
this.show()
  }
  async show(){
let data=await this.rest.PostDataToAPI<any[]>({trangThai:this.trangthai,ngaytao:this.ngaytao},'lamthemgio/Getdondangkylamthem').toPromise()
 Promise.all( data.map(async x=>{
  x.DX0070=await this.rest.GetDataFromAPI<any>('DX0070/getall/'+x.T007C).toPromise()
  x.DX0011=await this.rest.GetDataFromAPI<any>('DX0020/getdiembus/'+x.T002C).toPromise()
  x.DX0010=await this.rest.GetDataFromAPI<any>('DX0020/gettuyenbus/'+x.T002C).toPromise()
})).then(f=>{
  this.listdata=data
  ////console.log(this.listdata)
})

  }
async them(){}
async xoa(){
  if(!confirm(`Bạn chắc chắn muốn xóa `+this.listdata.filter(c=>c.check).length+` yêu cầu taxi không?`)){
    return false
  }
  let data=await this.rest.PostDataToAPI<any[]>(this.listdata.filter(c=>c.check),'DX0001/delete').toPromise();
  ////console.log(data)
  this.toasts.warning("Đã xóa "+data.filter(c=>c.code==="DELETE").length+" yêu cầu.",null,{timeOut:10000,closeButton:true,positionClass:'toast-bottom-right'})
  data.filter(c=>c.code==="DELETE").map(x=>{
    this.listdata.filter(c=>c.DX0001_ID===x.data.DX0001_ID).map(i=>this.listdata.splice(this.listdata.indexOf(i),1))
  })
}
async duyet(){
  this.listdata.filter(c=>c.check).map(x=>x.trangThai=2)
  let data=await this.rest.PostDataToAPI<any[]>(this.listdata.filter(c=>c.check),'DX0001/update').toPromise();
  this.toasts.success("Đã duyệt cho "+data.filter(c=>c.code==="OK").length+" yêu cầu",null,{timeOut:5000,closeButton:true,positionClass:'toast-bottom-right'})
  if(this.trangthai!='all')this.loc(data,1)
}
async huy(){
  this.listdata.filter(c=>c.check).map(x=>x.trangThai=1)
  let data=await this.rest.PostDataToAPI<any[]>(this.listdata.filter(c=>c.check),'DX0001/update').toPromise();
  this.toasts.error("Đã hủy "+data.filter(c=>c.code==="OK").length+" yêu cầu",null,{positionClass:'toast-bottom-right'})
  if(this.trangthai!='all')this.loc(data,2)
}
loc(data,num){
  data.filter(c=>c.code==="OK").map(x=>{
    this.listdata.filter(c=>c.DX0001_ID===x.data.DX0001_ID).map(i=>this.listdata.splice(this.listdata.indexOf(i),1))
  })
}
start=0;
step=40
getstep($event){
this.step=$event
}
getstart($event){
this.start=$event
}
}
