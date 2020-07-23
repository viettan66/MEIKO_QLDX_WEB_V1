import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-setting-diadiem-danhsach',
  templateUrl: './setting-diadiem-danhsach.component.html',
  styleUrls: ['./setting-diadiem-danhsach.component.css']
})
export class SettingDiadiemDanhsachComponent implements OnInit {

  constructor(public rest:RESTService) { }
  listdata = []
  listdiadanh = []
  async ngOnInit() {
    this.listdata=await this.rest.GetDataFromAPI<any[]>('DX0011/getall/all').toPromise()
    this.listdiadanh=await this.rest.GetDataFromAPI<any[]>('DX0014/getall').toPromise()
    ////console.log(this.listdata)
  }
  async themmoi() {
    let data=await this.rest.PostDataToAPI<any[]>([{}],'DX0011/update').toPromise();
    ////console.log(data)
    data.filter(c=>c.code==="OK").map(x=>{
      x.data.edit=true
      this.listdata.unshift(x.data)
      this.start=0
      
      this.rest.Toast_Success2("Đã thêm 1 điểm đón.")
    })
  }
  async xoatuyenduong() {
    if(!confirm(`Bạn chắc chắn muốn xóa `+this.listdata.filter(c=>c.check).length+` điểm đón?`)){
      return false
    }
    let data=await this.rest.PostDataToAPI<any[]>(this.listdata.filter(c=>c.check),'DX0011/Deletes').toPromise()
    ////console.log(data)
    let kk=0
    data.filter(c=>c.code==="DELETE").map(x=>{kk++
      this.listdata.filter(c=>c.DX0011_ID===x.data.DX0011_ID).map(i=>this.listdata.splice(this.listdata.indexOf(i),1))
    })
  }
  async suakhunggio(item) {
    item.edit=!item.edit
    if(!item.edit){
      let k=await this.rest.PostDataToAPI<any[]>([item],'DX0011/update').toPromise()
      ////console.log(k)
      if(k[0].code==="UPDATE"){
        
      this.rest.Toast_Success2("Đã lưu.")
      }
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
  change(item){
    this.listdiadanh.filter(x=>x.DX0014_ID===item.DX0014_ID).map(x=>item.DX0014=x)
  }
}
