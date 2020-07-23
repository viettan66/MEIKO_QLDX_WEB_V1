import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any

@Component({
  selector: 'app-setting-diadanh',
  templateUrl: './setting-diadanh.component.html',
  styleUrls: ['./setting-diadanh.component.css']
})
export class SettingDiadanhComponent implements OnInit {

  constructor(public rest:RESTService) { }
  listdiadanh=[]
  listdiemdon=[]
  async ngOnInit(){
    this.listdiadanh=await this.rest.GetDataFromAPI<any[]>('DX0014/Getall2').toPromise()
    this.listdiemdon = await this.rest.GetDataFromAPI<any[]>('DX0011/Getall/all').toPromise()
    ////console.log(this.listdiadanh)
  }
  newdiadanh:any={}
  themmoidiadanh(){
    this.rediadanhmoi()
    $('#themdiadanhmodal').modal()
  }
  async luudiadanhmoi(){
    let data=await this.rest.PostDataToAPI<any[]>([this.newdiadanh],"DX0014/add").toPromise()
    data.filter(c=>c.code==="OK").map(x=>{
      this.listdiadanh.push(x.data)
    })
    $('#themdiadanhmodal').modal('hide')
  }
  async suadiadanh(item){
    item.edit=!item.edit
    if(!item.edit){
      let data=await this.rest.PostDataToAPI<any[]>([item],"DX0014/add").toPromise()
      ////console.log(data)
    }
  }
  rediadanhmoi(){
    this.newdiadanh={}
  }
  async xoadiadanh(){
    if(!confirm('Bạn có thật sự muốn xóa '+this.listdiadanh.filter(c=>c.check).length+' địa danh?'))return false
    let data=await this.rest.PostDataToAPI<any[]>(this.listdiadanh.filter(c=>c.check),"DX0014/delete").toPromise()
    data.filter(c=>c.code==="OK").map(x=>{
      this.listdiadanh.filter(c=>c.DX0014_ID===x.data.DX0014_ID).map(v=>this.listdiadanh.splice(this.listdiadanh.indexOf(v),1))
    })
  }
  
  thisDX0013
  themdiemdon(item) {
    ////console.log(item)
    this.thisDX0013=item
    $('#themdiemdonmodal').modal()
  }
  async luudiendon() {
    let arr=this.listdiemdon.filter(c=>c.check)
    ////console.log(arr)
    for(const x of arr){
      x.DX0014_ID=this.thisDX0013.DX0014_ID
    }
    if(this.thisDX0013.DX0011==null)this.thisDX0013.DX0011=[]
    let data=await this.rest.PostDataToAPI<any[]>(arr,'DX0011/update').toPromise()
    data.filter(c=>c.code==="UPDATE").map(x=>{
      this.thisDX0013.DX0011.push(x.data)
    })
    $('#themdiemdonmodal').modal('hide')
    this.listdiemdon.map(c=>c.check=false)
  }
  async deletediemdon(item,item2){
    if(!confirm("Bạn muốn xóa điểm "+item2.tenDiemDon+" trong tuyến taxi "+item.tenDiemTaxi))return false
    this.thisDX0013=item
    item2.DX0014_ID=null   
    let data=await this.rest.PostDataToAPI<any[]>([item2],'DX0011/update').toPromise()
    data.filter(c=>c.code==="UPDATE").map(x=>{
      this.thisDX0013.DX0011.splice(this.thisDX0013.DX0011.indexOf(item2),1)
    })
  }
}
