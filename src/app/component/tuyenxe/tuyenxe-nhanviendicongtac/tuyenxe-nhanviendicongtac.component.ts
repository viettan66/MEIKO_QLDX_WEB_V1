import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-tuyenxe-nhanviendicongtac',
  templateUrl: './tuyenxe-nhanviendicongtac.component.html',
  styleUrls: ['./tuyenxe-nhanviendicongtac.component.css']
})
export class TuyenxeNhanviendicongtacComponent implements OnInit {

  constructor(public rest:RESTService) { }
  listdons=[]
  listdon=[]
  async ngOnInit(){
 this.filter()
  }
  xoadondangky(){

  }
  async pheduyetdondangky(){
    this.listdon.filter(c=>c.maForm==='SF013'&&c.check).map(x=>x.trangThai=2)
    let data=await this.rest.PostDataToAPI<any>(this.listdon.filter(c=>c.maForm==='SF013'&&c.check),'DX0001/update').toPromise()
    data.filter(c=>c.code==="OK").map(x=>this.listdon.filter(c=>c.DX0001_ID===x.data.DX0001_ID).map(c=>this.listdon.splice(this.listdon.indexOf(c),1)))
    console.log(data)
  }
  edititem(item){
    item.edit=!item.edit
    if(!item.edit){
      
    }
  }
  filt='1'
  async filter(){
    let data=await this.rest.GetDataFromAPI<any[]>('DX0001/Getdondicongtac/'+this.filt).toPromise()
    data.map(x=>{
      Object.keys(x).forEach(key=>{
        if(x[key]==null)x[key]=""
      })
    })
    this.listdon=data
  }

}
