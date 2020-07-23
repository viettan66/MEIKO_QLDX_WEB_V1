import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { async } from 'rxjs/internal/scheduler/async';
declare var $: any
@Component({
  selector: 'app-setting-lotrinhtaxi',
  templateUrl: './setting-lotrinhtaxi.component.html',
  styleUrls: ['./setting-lotrinhtaxi.component.css']
})
export class SettingLotrinhtaxiComponent implements OnInit {
  newtuyenduong: any = {}
  constructor(public rest: RESTService) { }
  listdata = []
  listdiemdon = []
  async ngOnInit() {
    this.listdata = await this.rest.PostDataToAPI<any[]>({ type: 3 }, 'DX0010/getalls').toPromise()
    this.listdiemdon = await this.rest.GetDataFromAPI<any[]>('DX0011/Getall/all').toPromise()
    ////console.log(this.listdata)
  }
  luutuyenduongmoi() {

  }
  async themmoi() {
    let data = await this.rest.PostDataToAPI<any[]>([{ edit: true, type: 3 }], "DX0010/add").toPromise()
    data.filter(c => c.code === "OK").map(x => {
      x.data.edit=true
      this.listdata.push(x.data)
      this.rest.Toast_Success2("Thêm mới 1 lộ trình taxi.")
    })

  }

  async suakhunggio(item) {
    item.edit = !item.edit
    if (!item.edit) {
      let data = await this.rest.PostDataToAPI<any[]>([item], "DX0010/add").toPromise()
      if(data[0].code==="OK"){
        this.rest.Toast_Success2("Đã lưu.")
      }
    }
  }
  thisDX0013
  themdiemdon(item) {
    ////console.log(item)
    this.thisDX0013 = item
    if(this.thisDX0013.DX0010D==null)this.thisDX0013.DX0010D=[]
    $('#themdiemdonmodal').modal()
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
    ////console.log(arr)
    let data = []

    for (let i=0;i<arr.length;i++) {
      data.push({ DX0010_ID: this.thisDX0013.DX0010_ID, DX0011_ID: arr[i].DX0011_ID, thuTu: i })
    }
    let result = await this.rest.PostDataToAPI<any[]>(data, 'DX0010D/add').toPromise()
    result.filter(c => c.code === "OK").map(x => this.thisDX0013.DX0010D.push(x.data))
    ////console.log(result)
    $('#themdiemdonmodal').modal('hide')
    this.listdiemdon.map(c => c.check = false)
    this.rest.Toast_Success2("Đã lưu.")
  }
  async xoatuyenduong() {
    if (!confirm('Bạn có chắc chắc chắn muốn xóa "' + this.listdata.filter(c => c.check).length + '" tuyến đường không?')) return false
    let data = await this.rest.PostDataToAPI<any[]>(this.listdata.filter(x => x.check), "DX0010/delete").toPromise()
    ////console.log(data)
    let ii=0
    data.filter(c => c.code === "OK").map(x => {
      ii++
      this.listdata.filter(c => c.DX0010_ID === x.data.DX0010_ID).map(i => this.listdata.splice(this.listdata.indexOf(i), 1))
    })
    this.rest.Toast_Success2("Đã xóa "+ii+' tuyến taxi.')
  }

  async deletediemdon(item,item2) {
    ////console.log(item)
    //if (!confirm("Bạn muốn xóa điểm " + item2.DX0011.tenDiemDon + " trong tuyến taxi " +item2.DX0010.tenTuyenXe)) return false
    let data = await this.rest.PostDataToAPI<any>(item2, 'DX0010D/delete').toPromise()
    if( data.code === "OK") {
      item.DX0010D.splice(item.DX0010D.indexOf(item2), 1)
    }
  }
}
