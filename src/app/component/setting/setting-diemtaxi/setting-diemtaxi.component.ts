import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $: any

@Component({
  selector: 'app-setting-diemtaxi',
  templateUrl: './setting-diemtaxi.component.html',
  styleUrls: ['./setting-diemtaxi.component.css']
})
export class SettingDiemtaxiComponent implements OnInit {

  constructor(public rest: RESTService) { }
  listdiemdon = []
  listkhunggio = []
  async ngOnInit() {
    this.listkhunggio = await this.rest.GetDataFromAPI<any[]>('DX0013/Getall/all').toPromise()
    this.listdiemdon = await this.rest.GetDataFromAPI<any[]>('DX0011/Getall/all').toPromise()
    this.listkhunggio.map(async x => {
      x.DX0011 = await this.rest.GetDataFromAPI<any>('DX0013/getdx0011/' + x.DX0013_ID).toPromise()
    })
  }
  suakhunggioclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  themmoikhunggio() {
    this.rediadanhmoi()
    $('#themkhunggiomodal').modal()
  }
  newkhunggio: any = { trangThai: true }
  suadiadanhclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  async luudiadanhmoi() {
    let data = await this.rest.PostDataToAPI<any[]>([this.newkhunggio], "DX0013/add").toPromise()
    ////console.log(data)
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.push(x.data)
    })
    $('#themkhunggiomodal').modal('hide')
  }
  async suakhunggio(item) {
    item.edit = !item.edit
    if (!item.edit) {
      let data = await this.rest.PostDataToAPI<any[]>([item], "DX0013/add").toPromise()
      ////console.log(data)
    }
  }
  async xoakhunggio() {
    if (!confirm('Bạn có thật sự muốn xóa ' + this.listkhunggio.filter(c => c.check).length + ' khung giờ?')) return false
    let data = await this.rest.PostDataToAPI<any[]>(this.listkhunggio.filter(c => c.check), "DX0013/delete").toPromise()
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.filter(c => c.DX0013_ID === x.data.DX0013_ID).map(v => this.listkhunggio.splice(this.listkhunggio.indexOf(v), 1))
    })
  }
  rediadanhmoi() {
    this.newkhunggio = { trangThai: true }
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
      x.DX0013_ID=this.thisDX0013.DX0013_ID
    }
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
    item2.DX0013_ID=null   
    let data=await this.rest.PostDataToAPI<any[]>([item2],'DX0011/update').toPromise()
    data.filter(c=>c.code==="UPDATE").map(x=>{
      this.thisDX0013.DX0011.splice(this.thisDX0013.DX0011.indexOf(item2),1)
    })
  }
}
