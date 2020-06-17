import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any
@Component({
  selector: 'app-setting-xebus',
  templateUrl: './setting-xebus.component.html',
  styleUrls: ['./setting-xebus.component.css']
})
export class SettingXebusComponent implements OnInit {

  constructor(public rest: RESTService) { }

  listkhunggio = []
  async ngOnInit() {
    this.listkhunggio = await this.rest.GetDataFromAPI<any[]>('DX0012/Getall').toPromise()
  }
  suakhunggioclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  themmoikhunggio() {
    this.rediadanhmoi()
    $('#themkhunggiomodal').modal()
  }
  newkhunggio:any={trangThai:true}
  suadiadanhclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  async luudiadanhmoi() {
    let data = await this.rest.PostDataToAPI<any[]>([this.newkhunggio], "DX0012/add").toPromise()
    console.log(data)
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.push(x.data)
    })
    $('#themkhunggiomodal').modal('hide')
  }
  async suakhunggio(item) {
    item.edit = !item.edit
    if (!item.edit) {
      let data = await this.rest.PostDataToAPI<any[]>([item], "DX0012/add").toPromise()
      console.log(data)
    }
  }
  async xoakhunggio() {
    if (!confirm('Bạn có thật sự muốn xóa ' + this.listkhunggio.filter(c => c.check).length + ' khung giờ?')) return false
    let data = await this.rest.PostDataToAPI<any[]>(this.listkhunggio.filter(c => c.check), "DX0012/delete").toPromise()
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.filter(c => c.DX0012_ID === x.data.DX0012_ID).map(v => this.listkhunggio.splice(this.listkhunggio.indexOf(v), 1))
    })
  }
  rediadanhmoi() {
    this.newkhunggio={trangThai:true}
}
}
