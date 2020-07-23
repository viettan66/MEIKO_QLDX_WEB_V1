import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $: any

@Component({
  selector: 'app-setting-thetaxi',
  templateUrl: './setting-thetaxi.component.html',
  styleUrls: ['./setting-thetaxi.component.css']
})
export class SettingThetaxiComponent implements OnInit {

  constructor(public rest: RESTService) { }

  listkhunggio = []
  nguoidixe = []
  async ngOnInit() {
    this.listkhunggio = await this.rest.GetDataFromAPI<any[]>('DX0050/Getall').toPromise()
    this.nguoidixe = await this.rest.GetDataFromAPI<any[]>('DX0020/Getall').toPromise()
    ////console.log(this.nguoidixe)
  }
  suakhunggioclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  themmoikhunggio() {
    this.rediadanhmoi()
    $('#themkhunggiomodal').modal()
  }
  newkhunggio = { 
    ghiChu:null,
    hangTaxi:null,
    loaiThe:null,
    maThe:null,
    ngayHetHan:null,
    ngayPhatHanh:null,
    soThe:null,
    trangThai:true, }
  suadiadanhclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  async luudiadanhmoi() {
    let data = await this.rest.PostDataToAPI<any[]>([this.newkhunggio], "DX0050/add").toPromise()
    ////console.log(data)
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.push(x.data)
    })
    $('#themkhunggiomodal').modal('hide')
  }
  async suakhunggio(item) {
    item.edit = !item.edit
    if (!item.edit) {
      let data = await this.rest.PostDataToAPI<any[]>([item], "DX0050/add").toPromise()
      ////console.log(data)
      ////console.log(item)
    }
  }
  async xoakhunggio() {
    if (!confirm('Bạn có thật sự muốn xóa ' + this.listkhunggio.filter(c => c.check).length + ' khung giờ?')) return false
    let data = await this.rest.PostDataToAPI<any[]>(this.listkhunggio.filter(c => c.check), "DX0050/delete").toPromise()
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.filter(c => c.DX0050_ID === x.data.DX0050_ID).map(v => this.listkhunggio.splice(this.listkhunggio.indexOf(v), 1))
    })
  }
  rediadanhmoi() {
    this.newkhunggio ={ 
      ghiChu:null,
      hangTaxi:null,
      loaiThe:null,
      maThe:null,
      ngayHetHan:null,
      ngayPhatHanh:null,
      soThe:null,
      trangThai:true, }
  }
  sethoten(item,manhansu){
    this.nguoidixe.filter(f=>f.manhansu===manhansu).map(f=>item.hoten=f.hodem)
  }
}
