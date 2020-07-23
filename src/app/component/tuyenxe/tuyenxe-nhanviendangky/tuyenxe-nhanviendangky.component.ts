import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { ToastrService } from 'ngx-toastr';
import * as Global from '../../../Service/global'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tuyenxe-nhanviendangky',
  templateUrl: './tuyenxe-nhanviendangky.component.html',
  styleUrls: ['./tuyenxe-nhanviendangky.component.css']
})
export class TuyenxeNhanviendangkyComponent implements OnInit {

  constructor(public rest:RESTService,public toast:ToastrService) { }
  listdons=[]
  listdon=[]
  start=0;
  step=20
  async loaddata(){
    
    let data=await this.rest.Get<any>(Global.APIGetDon+'all').toPromise()
    ////console.log(data)
   let result=await this.rest.PostDataToAPI<any[]>(data.data,'DX0001/add').toPromise();
   ////console.log(result)
    result.filter(c=>c.code==="EXIST"||c.code==="OK").map(async x=>{
      let data2=await this.rest.Get<any>(Global.APIUpdateDon+x.data.A0028_ID).toPromise()
      ////console.log(data2)
    })

  }
  loading=true
  async ngOnInit(){
    this.loaddata()
    let data=await this.rest.GetDataFromAPI<any[]>('DX0001/Getdondangky').toPromise()
    ////console.log(data)
    // for(const x of data){
    //   let k=await this.rest.GetDataFromAPI<any>('DX0010/getall/'+x.T009C).toPromise()
    //   x.DX0010=k.length>0?k[0]:null
    //   let kk=await this.rest.GetDataFromAPI<any>('DX0011/getall/'+x.T008C).toPromise()
    //   x.DX0011=kk.length>0?kk[0]:null
    // }
    this.listdons=data
    this.listdon=data
    this.loading=false
    this.filter()
  }
  async xoadondangky(){
    if(this.listdon.filter(c=>c.check).length==0){
      this.toast.info("Hãy chọn ít nhất 1 đơn để sử dụng chức năng này.","Thông báo",{positionClass:'toast-bottom-right'})
      return false
    }
    if(this.listdon.filter(c=>c.check).filter(c=>c.trangThai==2).length>0){
      this.toast.warning("Bạn chỉ được phép xóa đơn chưa duyệt.","Thông báo",{positionClass:'toast-bottom-right'})
      return false
    }
    if(!confirm(`Bạn chắc chắn muốn xóa`+this.listdon.filter(c=>c.check).length+` đơn.`)){
      return false
    }
    let data=await this.rest.PostDataToAPI<any>(this.listdon.filter(c=>c.check),'DX0001/delete').toPromise()
    ////console.log(data)
    let ii=0
    data.filter(x=>x.code==="DELETE").map(x=>{
      ii++
      this.listdon.filter(v=>v.DX0001_ID===x.data.DX0001_ID).map(v=>this.listdon.splice(this.listdon.indexOf(v),1))
    })
    this.rest.Toast_Success("Đã xóa thành công "+ii+' đơn.',null,{positionClass:'toast-bottom-right'})
  }
  async pheduyetdondangky(){
    let data=await this.rest.PostDataToAPI<any>(this.listdon.filter(c=>c.check),'DX0020/add').toPromise()
    // this.listdons.filter(c=>&&c.check).map(x=>x.trangThai=2)
    // 
    let notify=""
    for(const x of data.filter(c=>c.code==="EXIST")){
      notify+='"'+x.data.T001C+'" đã có đơn từ trước. hãy kiểm tra lại\n'
    }
    notify!=""?alert(notify):''
    notify=""
    for(const x of data.filter(c=>c.code==="ERR")){
      notify+='"'+x.data.T001C+'" lỗi phê duyệt. hãy kiểm tra lại\n'
    }
    notify!=""?alert(notify):''
    let ii=0
    data.filter(c=>c.code==="OK").map( x=>{
      ii++
      this.listdons.filter(c=>c.T002C===x.data.manhansu).map(x=>{
        x.trangThai=2
        this.rest.PostDataToAPI<any>([x],'DX0001/update').subscribe(d=>{
           ////console.log(d)
        })
      })
    })
    this.filter()
    ////console.log(data)
    if(ii>0)
    this.rest.Toast_Success("Phê duyệt thành công "+ii+' đơn.',null,{positionClass:'toast-bottom-right'})
  }
  edititem(item){
    item.edit=!item.edit
    if(!item.edit){
      
    }
  }
  filt='1'
  filter(){
    ////console.log(this.listdons)
    if(this.filt=='all'){
      this.listdon=this.listdons
      return false
    }
    this.listdon=this.listdons.filter(c=>c.trangThai===Number(this.filt))
    ////console.log(this.listdon)
  }
  keysearch=''
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  
  async thaydoituyenxechonhanvien(){
    if(this.listdon.filter(c=>c.check).length==0){
      this.toast.info("Hãy chọn ít nhất 1 đơn để sử dụng chức năng này.","Thông báo",{positionClass:'toast-bottom-right'})
      return false
    }
    if(this.listdon.filter(c=>c.check).filter(c=>c.trangThai==2).length>0){
      this.toast.warning("Bạn chỉ được Chọn đơn chưa duyệt.","Thông báo",{positionClass:'toast-bottom-right'})
      return false
    }
    this.loading=true
          let ii=0
          let ng=0
   Promise.all( this.listdon.filter(c=>c.check).map( async j=>{
      let data=await this.rest.PostDataToAPI<any>([j],"DX0020/thaydoi").toPromise()
          if(data[0].code==="OK"){
            ii++
            j.trangThai=2
            let kjjjj=await this.rest.PostDataToAPI<any>([j],'DX0001/update').toPromise()
            ////console.log(kjjjj)
          }
          else{
            ng++
          }
    })).then(d=>{
      if(ng!=0){
            this.rest.Toast_Error2("Lỗi thay đổi tuyến cho "+ng+' nhân viên.')
          }if(ii!=0){
            this.rest.Toast_Success2("Đã thay đổi tuyến cho "+ii+' nhân viên.')
          }
          this.loading=false
    })
          
          
          

          
  }
  
  showdata(){

  }
  filtersearch=''
  checkemty(){}
}
