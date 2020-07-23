import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio-chuyenxe',
  templateUrl: './tuyenxe-nhanvienlamthemgio-chuyenxe.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio-chuyenxe.component.css']
})
export class TuyenxeNhanvienlamthemgioChuyenxeComponent implements OnInit {

  constructor(public rest: RESTService,public toast:ToastrService) { }
  loading = true;
  start = 0; step = 20; trangthai = '1'; ngaytao = "false"
  startdate
  enddate
  newdatw = new Date()
  listdata = []
  filtertrangthai = 'null'
  filtertienTrinh=999
  filtersearch=''
  async ngOnInit() {
    this.showdata()
  }
  async showdata() {
    this.loading = true;
    this.listdata = await this.rest.PostDataToAPI<any[]>({ trangthai: this.filtertrangthai,tientrinh: this.filtertienTrinh,ID:this.filtersearch }, "DX0060/getall").toPromise()
    setTimeout(() => { this.loading = false }, 600);
    ////console.log(this.listdata)
    this.listdata.map(async ff=>{
      //getKM
      let arr=await this.rest.PostDataToAPI<any>(ff.ghiChu.split('->'),'DX0011/getlatlngwidthtendiem/').toPromise()
      if(arr.length>2){
      }
        ////console.log(arr,ff.ghiChu.split('->'))
    })
  }
  getstep($event) {
    this.step=$event
   }
  getstart($event) { 
    this.start=$event
  }
  show() { }
  async huy() {
    if(this.listdata.filter(f=>f.check&&f.trangThai==true).length>0){
      this.rest.Toast_Error("Bạn không thể thao tác đến chuyến xe đã xử lý xong.",'Thông báo')
      return false
    }
    this.listdata.filter(f=>f.check).map(fg=>{fg.tienTrinh=9})
  let data = await this.rest.PostDataToAPI<any>(this.listdata.filter(f=>f.check), 'DX0060/add').toPromise();
    this.listdata.filter(f=>f.check).map(fg=>{fg.check=false})
  //console.log(data) 
}
  async duyet() {
    if(this.listdata.filter(f=>f.check&&f.trangThai==true).length>0){
      this.rest.Toast_Error("Bạn không thể thao tác đến chuyến xe đã xử lý xong.",'Thông báo')
      return false
    }
    ////console.log(this.startdate)
    ////console.log(this.enddate)
    this.listdata.filter(f=>f.check).map(fg=>{fg.tienTrinh=1})
    let data = await this.rest.PostDataToAPI<any>(this.listdata.filter(f=>f.check), 'DX0060/add').toPromise();
    this.listdata.filter(f=>f.check).map(fg=>{fg.check=false})
    //console.log(data)
    
  }
  async xoa() {
    if(this.listdata.filter(c=>c.check).length==0){
      this.toast.info("Bạn chưa chọn chuyến xe nào để xóa",null,{positionClass:'toast-bottom-right'})
    }
    if(!confirm(`Bạn chắc chắn muốn xóa `+this.listdata.filter(c=>c.check).length+` chuyến xe không?`)){
      return false
    }
    let data=await this.rest.PostDataToAPI<any>(this.listdata.filter(c=>c.check),"DX0060/delete").toPromise()
    ////console.log(data)
    let ik=0
    data.filter(c=>c.code==="DELETE").map(x=>{
      this.listdata.filter(c=>c.DX0060_ID===x.data.DX0060_ID).map(i=>this.listdata.splice(this.listdata.indexOf(i),1))
      ik++
    })
    this.toast.success("Xóa "+ik+" chuyến xe thành công, Chú ý sắp lại xe cho nhân viên bị hủy xe.","Thông báo",{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
   }
  hide(item) {
    this.listdata.filter(f => f !== item).map(g => g.shows = false)
  }
  async searchmataxi(item){
    if(item.loaiThanhToan==1){
      item.soThe=null
      item.listmathe=null
      return false
    }
    else if(item.loaiThanhToan==2){
      let manhansu=''
      item.DX0061.filter(a=>a.DX0001_ID==item.DX0001_ID).map(f=>manhansu=f.DX0001.T002C)
      //////console.log(manhansu)
      let kk=await this.rest.GetDataFromAPI<any>('DX0050/searchmathetaxi/'+manhansu).toPromise()
      item.listmathe=kk
      if(kk.length==1)item.soThe=kk[0]
      this.update(item)
    }
    
   //
  }
  async update(item) {
    if (item.loaiThanhToan == 1) {
      item.soThe=null
    }
    ////console.log(item)
    let data = await this.rest.PostDataToAPI<any>([item], 'DX0060/add').toPromise();
    //console.log(data)
  }
  getstaratdate($event) {
    ////console.log($event)
  }
  caculatordistince(location){
    let kk=[];
   
      const p1:any=(
        location[0].lat,location[0].lng
      );
      ////console.log(p1)
      kk.push(p1)

    ////console.log(kk)
      return google.maps.geometry.spherical.computeLength(kk)/1000
  }
  checkemty(){
    if(this.filtersearch=='')this.showdata()
  }
}

