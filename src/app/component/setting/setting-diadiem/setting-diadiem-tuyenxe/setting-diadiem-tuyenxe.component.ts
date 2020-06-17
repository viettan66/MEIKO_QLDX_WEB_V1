import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any

@Component({
  selector: 'app-setting-diadiem-tuyenxe',
  templateUrl: './setting-diadiem-tuyenxe.component.html',
  styleUrls: ['./setting-diadiem-tuyenxe.component.css']
})
export class SettingDiadiemTuyenxeComponent implements OnInit {

  constructor(public rest:RESTService) { }

  async ngOnInit() {
    this.listdata=await this.rest.PostDataToAPI<any[]>({type:1},"DX0010/getalls").toPromise()
    let kl= await this.rest.PostDataToAPI<any>({type:2},"DX0010/getalls").toPromise()
    kl.length>0?this.listdata.push(kl):''
    this.listdiemdon = await this.rest.GetDataFromAPI<any[]>('DX0011/Getall/all').toPromise()
    console.log(this.listdata)
  }
  listdata = []
  listdiemdon = []
  listxebus = []
  thistuyenxe
  async themmoi() {
    let data=await this.rest.PostDataToAPI<any[]>([{type:1,trangThai:true}],'DX0010/add').toPromise();
    console.log(data)
    data.filter(c=>c.code==="OK").map(x=>{
      x.data.edit=true
      this.listdata.unshift(x.data)
      this.start=0
    })
  }
  listchose=[]
  getlistchose(item){
    if(this.listchose.indexOf(item)==-1){
      this.listchose.push(item)
    }
    else{
      this.listchose.splice(this.listchose.indexOf(item),1)
    }
  }
  async luudiendon() {
    let arr = this.listchose
    console.log(arr)
    let data = []

    for (const x of arr) {
      data.push({ DX0010_ID: this.thisDX0013.DX0010_ID, DX0011_ID: x.DX0011_ID, thuTu: data.length })
    }
    let result = await this.rest.PostDataToAPI<any[]>(data, 'DX0010D/add').toPromise()
    result.filter(c => c.code === "OK").map(x => this.thisDX0013.DX0010D.push(x.data))
    console.log(result)
    $('#themdiemdonmodal').modal('hide')
    this.listdiemdon.map(c => c.check = false)
  }
  async xoatuyenduong() {
    if(!confirm(`Bạn chắc chắn muốn xóa `+this.listdata.filter(c=>c.check).length+` điểm đón?`)){
      return false
    }
    let data=await this.rest.PostDataToAPI<any[]>(this.listdata.filter(c=>c.check),'DX0010/Delete').toPromise()
    console.log(data)
    data.filter(c=>c.code==="OK").map(x=>{
      this.listdata.filter(c=>c.DX0010_ID===x.data.DX0010_ID).map(i=>this.listdata.splice(this.listdata.indexOf(i),1))
    })
  }
  async suakhunggio(item) {
    item.edit=!item.edit
    console.log(item)
    if(!item.edit){
      let k=await this.rest.PostDataToAPI<any[]>([item],'DX0010/add').toPromise()
      console.log(k)
     // k.filter(c=>c.code="UPDATE").map
    }
  }
  start=0
  step=30
  getstart($event){
this.start=$event
  }
  getstep($event){

this.step=$event
  }
  async deletediemdon(item,item2) {
    console.log(item)
    //if (!confirm("Bạn muốn xóa điểm " + item2.DX0011.tenDiemDon + " trong tuyến taxi " +item2.DX0010.tenTuyenXe)) return false
    let data = await this.rest.PostDataToAPI<any>(item2, 'DX0010D/delete').toPromise()
    if( data.code === "OK") {
      item.DX0010D.splice(item.DX0010D.indexOf(item2), 1)
    }
  }
  thisDX0013
  themdiemdon(item) {
    console.log(item)
    this.thisDX0013 = item
    if(this.thisDX0013.DX0010D==null)this.thisDX0013.DX0010D=[]
    $('#themdiemdonmodal').modal()
  }
  listxe=[]
  async themxe(item) {
    this.listxebus = await this.rest.GetDataFromAPI<any[]>('DX0012/Getall').toPromise()
    this.listxe.map(c => c.check = false)
 this.listchosexe=[]
    console.log(item)
    this.listxe=this.listxebus.filter(c=>c.DX0010_ID===null)
    this.thistuyenxe=item
   // if(this.thisDX0013.DX0010D==null)this.thisDX0013.DX0010D=[]
    $('#themxebuschotuyenxemodal').modal()
  }
  listchosexe=[]
  getlistchosexe(item){
    if(this.listchosexe.indexOf(item)==-1){
      this.listchosexe.push(item)
    }
    else{
      this.listchosexe.splice(this.listchosexe.indexOf(item),1)
    }
  }
  async luuxe(){
    let arr = this.listchosexe
    console.log(arr)
    console.log(this.thistuyenxe)
    for (const x of arr) {
      x.DX0010_ID=this.thistuyenxe.DX0010_ID
    }
    let result = await this.rest.PostDataToAPI<any[]>(arr, 'DX0012/add').toPromise()
     result.filter(c => c.code === "OK").map(x => this.thistuyenxe.DX0012.push(x.data))
     console.log(result)
     $('#themxebuschotuyenxemodal').modal('hide')
  
  }
  async deletexe(item,item2){
    this.thistuyenxe=item
    console.log(item)
    console.log(item2)
    item2.DX0010_ID=null
    let result=await this.rest.PostDataToAPI<any>([item2],"DX0012/add").toPromise()
    result.filter(c => c.code === "OK").map(x => this.thistuyenxe.DX0012.filter(f=>f.DX0012_ID===x.data.DX0012_ID).map(y=>this.thistuyenxe.DX0012.splice(this.thistuyenxe.DX0012.indexOf(y),1)))
  }
}
