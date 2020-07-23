import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any
@Component({
  selector: 'app-settingthongtintrangchu',
  templateUrl: './settingthongtintrangchu.component.html',
  styleUrls: ['./settingthongtintrangchu.component.css']
})
export class SettingthongtintrangchuComponent implements OnInit {

  constructor(public rest: RESTService) { }
  baivietmoi: any = {}
  ckEditorConfig
  listdata = []
  async ngOnInit() {
    this.listdata = await this.rest.GetDataFromAPI<any[]>('DX0150/getall').toPromise()
    console.log(this.listdata)
  
  }
  async save() {
    this.baivietmoi.trangThai=true
    console.log(this.baivietmoi.s3)
    let data = await this.rest.PostDataToAPI<any>(this.baivietmoi,"DX0150/add").toPromise()
    console.log(data)
  }
  add(){
    
    $('#my-modal').modal()
  }
async deletes(DX0150_ID){
let data=await this.rest.GetDataFromAPI<any>("DX0150/delete/"+DX0150_ID).toPromise()
console.log(data)
if(data.code==="DELETE"){
    this.listdata.filter(c=>c.DX0150_ID===data.data.DX0150_ID).map(i=>this.listdata.splice(this.listdata.indexOf(i),1))
  
}
  }
}
