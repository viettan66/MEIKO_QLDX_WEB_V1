import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $: any

@Component({
  selector: 'app-setting-khungthoigian',
  templateUrl: './setting-khungthoigian.component.html',
  styleUrls: ['./setting-khungthoigian.component.css']
})
export class SettingKhungthoigianComponent implements OnInit {

  constructor(public rest: RESTService) { }
  listkhunggio = []
  async ngOnInit() {
    this.listkhunggio = await this.rest.GetDataFromAPI<any[]>('DX0070/Getall/all').toPromise()
  }
  suakhunggioclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  themmoikhunggio() {
    this.rediadanhmoi()
    $('#themkhunggiomodal').modal()
  }
  newkhunggio = { trangThai: true, tenKhungGio: null, timeMin: null, timeMax: null, ghiChu: null }
  suadiadanhclick(item) {
    item.edit = item.edit == null ? true : (item.edit ? false : true)
  }
  async luudiadanhmoi() {
    if ((!/^\d{2}:\d{2}:\d{2}$/.test(this.newkhunggio.timeMin)) || (!/^\d{2}:\d{2}:\d{2}$/.test(this.newkhunggio.timeMax))) {
      alert('TimeMin hoặc TimeMax không đúng theo định dạng "00:00:00"')
      return false
    }
    var parts = this.newkhunggio.timeMax.split(':');
    if (parts[0] > 23 || parts[1] > 59 || parts[2] > 59) {
      alert('TimeMin hoặc TimeMax không đúng theo định dạng "00:00:00"')
      return false
    }
    parts = this.newkhunggio.timeMin.split(':');
    if (parts[0] > 23 || parts[1] > 59 || parts[2] > 59) {
      alert('TimeMin hoặc TimeMax không đúng theo định dạng "00:00:00"')
      return false
    }
    let data = await this.rest.PostDataToAPI<any[]>([this.newkhunggio], "DX0070/add").toPromise()
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.push(x.data)
    })
    $('#themkhunggiomodal').modal('hide')
  }
  async suakhunggio(item) {
    item.edit = !item.edit
    if (!item.edit) {
      let data = await this.rest.PostDataToAPI<any[]>([item], "DX0070/add").toPromise()
      console.log(data)
    }
  }
  async xoakhunggio() {
    if (!confirm('Bạn có thật sự muốn xóa ' + this.listkhunggio.filter(c => c.check).length + ' khung giờ?')) return false
    let data = await this.rest.PostDataToAPI<any[]>(this.listkhunggio.filter(c => c.check), "DX0070/delete").toPromise()
    data.filter(c => c.code === "OK").map(x => {
      this.listkhunggio.filter(c => c.DX0070_ID === x.data.DX0070_ID).map(v => this.listkhunggio.splice(this.listkhunggio.indexOf(v), 1))
    })
  }
  rediadanhmoi() {
    this.newkhunggio = { trangThai: true, tenKhungGio: null, timeMin: null, timeMax: null, ghiChu: null }
  }
}
