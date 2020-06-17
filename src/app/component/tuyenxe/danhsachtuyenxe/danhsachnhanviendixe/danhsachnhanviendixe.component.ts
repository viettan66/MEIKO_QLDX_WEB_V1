import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-danhsachnhanviendixe',
  templateUrl: './danhsachnhanviendixe.component.html',
  styleUrls: ['./danhsachnhanviendixe.component.css']
})
export class DanhsachnhanviendixeComponent implements OnInit {

  constructor(public rest:RESTService) { }
  listdatas=[]
  async ngOnInit() {
    this.listdatas=await this.rest.GetDataFromAPI<any[]>('DX0020/getall').toPromise()
    console.log(this.listdatas)
  }
  async deletenhanviendixe(){
    if(!confirm('Bạn có chắc chắn muốn xóa '+this.listdatas.filter(c=>c.check).length+' Nhân viên.'))return false
    let data=await this.rest.PostDataToAPI<any[]>(this.listdatas.filter(c=>c.check),'DX0020/delete').toPromise();
    console.log(data)
    data.filter(c=>c.code==="DELETE").map(x=>{
      this.listdatas.filter(c=>c.DX0020_ID===x.data.DX0020_ID).map(i=>this.listdatas.splice(this.listdatas.indexOf(i),1))
    })
  }
}
