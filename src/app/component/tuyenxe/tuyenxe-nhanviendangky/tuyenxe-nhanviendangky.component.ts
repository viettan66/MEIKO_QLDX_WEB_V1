import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-tuyenxe-nhanviendangky',
  templateUrl: './tuyenxe-nhanviendangky.component.html',
  styleUrls: ['./tuyenxe-nhanviendangky.component.css']
})
export class TuyenxeNhanviendangkyComponent implements OnInit {

  constructor(public rest:RESTService) { }
  listdons=[]
  listdon=[]
  start=0;
  step=20
  async ngOnInit(){
    let data=await this.rest.GetDataFromAPI<any[]>('DX0001/Getdondangky').toPromise()
    console.log(data)
    for(const x of data){
      let k=await this.rest.GetDataFromAPI<any>('DX0010/getall/'+x.T009C).toPromise()
      x.DX0010=k.length>0?k[0]:null
      let kk=await this.rest.GetDataFromAPI<any>('DX0011/getall/'+x.T008C).toPromise()
      x.DX0011=kk.length>0?kk[0]:null
    }
    this.listdons=data
    this.listdon=data
  }
  async xoadondangky(){
    if(!confirm(`Bạn chắc chắn muốn xóa`+this.listdon.filter(c=>c.maForm==='SF014'&&c.check).length+` đơn.`)){
      return false
    }
    let data=await this.rest.PostDataToAPI<any>(this.listdon.filter(c=>c.maForm==='SF014'&&c.check),'DX0001/delete').toPromise()
    console.log(data)
    data.filter(x=>x.code==="DELETE").map(x=>{
      this.listdon.filter(v=>v.DX0001_ID===x.data.DX0001_ID).map(v=>this.listdon.splice(this.listdon.indexOf(v),1))
    })
  }
  async pheduyetdondangky(){
    let data=await this.rest.PostDataToAPI<any>(this.listdon.filter(c=>c.maForm==='SF014'&&c.check),'DX0020/add').toPromise()
    // this.listdons.filter(c=>c.maForm==='SF014'&&c.check).map(x=>x.trangThai=2)
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
    data.filter(c=>c.code==="OK").map( x=>{
      this.listdons.filter(c=>c.A0028_ID===x.data.A0028_ID).map(x=>{
        x.trangThai=2
        this.rest.PostDataToAPI<any>([x],'DX0001/update').subscribe(d=>{
           console.log(d)
        })
      })
    })
    this.filter()
    console.log(data)
  }
  edititem(item){
    item.edit=!item.edit
    if(!item.edit){
      
    }
  }
  filt='all'
  filter(){
    console.log(this.listdons)
    if(this.filt=='all'){
      this.listdon=this.listdons
      return false
    }
    this.listdon=this.listdons.filter(c=>c.trangThai===Number(this.filt))
  }
  keysearch=''
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  search(element){
    if(element.MKV9999!=null){
      if(element.MKV9999.manhansu.indexOf(this.keysearch)!=-1)return true
      if((element.MKV9999.hodem+" "+element.MKV9999.ten).indexOf(this.keysearch)!=-1)return true
      if(element.MKV9999.cmtnd_so.indexOf(this.keysearch)!=-1)return true
      return false
    }else{
      if(element.User_ID.indexOf(this.keysearch)!=-1)return true
      return false

    }
    
  }
}
