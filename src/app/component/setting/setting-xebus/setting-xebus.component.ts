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
    ////console.log(data)
    data.filter(c => c.code === "OK").map(x => {
      this.rest.Toast_Success2("Đã thêm 1 xe bus")
      this.listkhunggio.push(x.data)
    })
    $('#themkhunggiomodal').modal('hide')
  }
  async suakhunggio(item) {
    item.edit = !item.edit
    if (!item.edit) {
      let data = await this.rest.PostDataToAPI<any[]>([item], "DX0012/add").toPromise()
      ////console.log(data)
      if(data[0].code==="OK"){
        this.rest.Toast_Success2("Đã lưu")
      }
      
    }
  }
  async xoakhunggio() {
    if (!confirm('Bạn có thật sự muốn xóa ' + this.listkhunggio.filter(c => c.check).length + ' khung giờ?')) return false
    let data = await this.rest.PostDataToAPI<any[]>(this.listkhunggio.filter(c => c.check), "DX0012/delete").toPromise()
    let ii=0
    data.filter(c => c.code === "OK").map(x => {ii++
      this.listkhunggio.filter(c => c.DX0012_ID === x.data.DX0012_ID).map(v => this.listkhunggio.splice(this.listkhunggio.indexOf(v), 1))
    })
      this.rest.Toast_Success2("Đã xóa "+ii+' xe bus')
  }
  rediadanhmoi() {
    this.newkhunggio={trangThai:true}
    this.rest.Toast_Success2("Làm mới...")
}
}
