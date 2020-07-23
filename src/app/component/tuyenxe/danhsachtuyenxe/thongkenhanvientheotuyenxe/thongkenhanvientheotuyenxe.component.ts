import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-thongkenhanvientheotuyenxe',
  templateUrl: './thongkenhanvientheotuyenxe.component.html',
  styleUrls: ['./thongkenhanvientheotuyenxe.component.css']
})
export class ThongkenhanvientheotuyenxeComponent implements OnInit {

  constructor(public rest :RESTService) { }
tuyenduong:any[]
count=[]
 async ngOnInit() {
  this.tuyenduong=await this.rest.GetDataFromAPI<any[]>('DX0010/getall/all').toPromise()
  ////console.log(this.tuyenduong)
 this.tuyenduong.map(async x=>{
    if(this.count.length<x.DX0010D.length)this.count=x.DX0010D
  })

  }
 async showdulieu(item){
    ////console.log(item)
    let data=await this.rest.GetDataFromAPI<any[]>('DX0010/getall_tuyenduong/'+item.DX0011_ID).toPromise()
    ////console.log(data)
  }
}
