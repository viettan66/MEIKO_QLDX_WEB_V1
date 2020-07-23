import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { async } from 'rxjs/internal/scheduler/async';
declare var $:any
@Component({
  selector: 'app-danhsachnhanviendixe',
  templateUrl: './danhsachnhanviendixe.component.html',
  styleUrls: ['./danhsachnhanviendixe.component.css']
})
export class DanhsachnhanviendixeComponent implements OnInit {

  constructor(public rest:RESTService) { }
  listdatas=[]
  listtuyen=[]
  listdiem=[]
  listdiems=[]
  editall=false
  start=0
  step=20
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  async ngOnInit() {
    this.listdatas=await this.rest.GetDataFromAPI<any[]>('DX0020/getall2').toPromise()
    this.listtuyen=await this.rest.GetDataFromAPI<any[]>('DX0010/getall/all').toPromise()
    this.listdiems=await this.rest.GetDataFromAPI<any[]>('DX0011/getall/all').toPromise()
    ////console.log(this.listdatas)
    this.loading=false
  }
  async deletenhanviendixe(){
    if(!confirm('Bạn có chắc chắn muốn xóa '+this.listdatas.filter(c=>c.check).length+' Nhân viên.'))return false
    let data=await this.rest.PostDataToAPI<any[]>(this.listdatas.filter(c=>c.check),'DX0020/delete').toPromise();
    ////console.log(data)
    let ii=0
    data.filter(c=>c.code==="DELETE").map(x=>{
      ii++
      this.listdatas.filter(c=>c.DX0020_ID===x.data.DX0020_ID).map(i=>this.listdatas.splice(this.listdatas.indexOf(i),1))
    })
    this.rest.Toast_Success("Đã xóa "+ii+' người đi xe bus, trạng thái đơn đăng ký sẽ được update là chưa duyệt.','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
  }
  newcomer:any={
    TC013:1,
    trangThai:2,
    maForm:'SF014',
    ngayTao:new Date().toLocaleString(),
    noiDungCongViec:'Tạo mới từ GA',

  }
  themnhanviendixe(){
    $("#my-modalthemnhanviendixe").modal()
  }
  getngaybatdausudung($event){
    this.newcomer.T010C=$event
  }
  async filterdiemdon($event){
    ////console.log($event)
    this.listdiem=await this.rest.GetDataFromAPI<any>('DX0011/getalldiemdonwidthidtuyenduong/'+$event.target.value).toPromise()
    ////console.log(this.listdiem)
  }
  async filterdiemdons($event,item){
    item.alldiemdon=await this.rest.GetDataFromAPI<any>('DX0011/getalldiemdonwidthidtuyenduong/'+$event.target.value).toPromise()
  }
  async savenguoidkemois(){
    if(this.newcomer.T010C==null){
      this.rest.Toast_Warning('Bạn chưa chọn ngày bắt đầu sử dụng xe','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      return false
    }
    if(this.newcomer.T008C==null){
      this.rest.Toast_Warning('Bạn chưa chọn Điểm lên xuống hằng ngày','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      return false
    }
    if(this.newcomer.T009C==null){
      this.rest.Toast_Warning('Bạn chưa chọn Tuyến sử dụng hằng ngày','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      return false
    }
    ////console.log(this.newcomer)
    let data=await this.rest.PostDataToAPI<any>([this.newcomer],'DX0001/add').toPromise()
    if(data[0].code==="OK"){
      let data2=await this.rest.PostDataToAPI<any>([this.newcomer],'DX0020/add').toPromise()
      ////console.log(data2)
      if(data2[0].code==="OK"){
        this.listdatas.push(data2[0].data)
        this.rest.Toast_Success("Đã thêm 1 nhân viên đi xe bus hằng ngày.",'Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
        $("#my-modalthemnhanviendixe").modal('hide')
      }else{
        this.rest.Toast_Error('Lỗi thêm 1 đơn: "'+data2[0].mess+'"','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      }
    }
  }
  async getdataexcel($event){
    $event.map(x=>{
      this.listtuyen.filter(c=>c.tenTuyenXe===x['Tuyến']).map(b=>x.T009C=b.DX0010_ID)
      this.listdiems.filter(c=>c.tenDiemDon===x['Điểm']).map(b=>x.T008C=b.DX0011_ID)
      x.T010C=x['Thời gian sử dụng']
      x.T002C=x['Mã ID']
      x.T001C=x['Họ Tên']
      x.T028C=x['Chức vụ']
      x.T005C=x['Cấp bậc']
      x.T006C=x['Bộ phận']+(x['Công đoạn']!=null?('/'+x['Công đoạn']):'')
      x.T027C=x['Địa chỉ mail']!=null?(((x['Địa chỉ mail']+'').indexOf('@')==-1)?(x['Địa chỉ mail']+'@meiko-elec.com'):(x['Địa chỉ mail'])):''
      x.T004C=(x['Di động/Máy lẻ']==null?'':x['Di động/Máy lẻ'])+(x['Máy lẻ']!=null?('/'+x['Máy lẻ']):'')
      x.T013C=1
      x.trangThai=2
      x.maForm='SF014'
      x.ngayTao=new Date().toLocaleString()
      x.noiDungCongViec='GA thêm từ file'
    })
    let ok=0;let ng=0
    let err=[]
    ////console.log($event)
    Promise.all($event.map(async x=>{
      if(x.T009C==null||x.T009C==undefined||x.T008C==null||x.T008C==undefined){
        err.push(x)
        ng++
        return false
      }
       let data=await this.rest.PostDataToAPI<any>([x],'DX0001/add').toPromise()
                    if(data[0].code==="OK"){
                      let data2=await this.rest.PostDataToAPI<any>([x],'DX0020/add').toPromise()
                      //////console.log(data2)
                      if(data2[0].code==="OK"){
                        this.listdatas.push(data2[0].data)
                        ok++
                      }else{
                        let datadelete=await this.rest.PostDataToAPI<any>([data[0].data],'DX0001/delete').toPromise()
                        ng++
                        err.push(x)
                        ////console.log(data2[0].mess,x)
                      }
                    }
    })).then(s=>{
 this.rest.Toast_Success("Đã thêm "+ok+" nhân viên đi xe bus hằng ngày.",'Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
        this.rest.Toast_Error('Lỗi thêm '+ng+' đơn.','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
        this.rest.ExportTOExcelFromJson(err,"Danh sách lỗi khi thêm")
    })
  }
  editallnhanvien(){
    ////console.log(this.listtuyen)
    this.kdfkjdkjfkdj()
    ////console.log(this.listdatas)
    this.editall=!this.editall
  }
  kdfkjdkjfkdj(){
    this.listdatas.map(x=>{
      x.alldiemdon=[]
      this.listtuyen.filter(c=>c.DX0010_ID===x.DX0010_ID).map(c=>{
        c.DX0010D.map(h=>{
          x.alldiemdon.push(h.DX0011)
        })
      })
    })
  }
  async saveallnhanvien(){
    ////console.log(this.listdatas)
    let arr=[]
    this.listdatas.map(f=>{
      arr.push({
        DX0010_ID:f.DX0010_ID,
        DX0011_ID:f.DX0011_ID,
        capbac:f.capbac,
        chucvu:f.chucvu,
        diachithuongtru:f.diachithuongtru,
        dienthoai_didong:f.dienthoai_didong,
        email:f.email,
        hodem:f.hodem,
        manhansu:f.manhansu,
        trangThai:f.trangThai,
        thoiGianSuDung:f.thoiGianSuDung,
        DX0020_ID:f.DX0020_ID
      })
    })
    let data=await this.rest.PostDataToAPI<any[]>(arr,'DX0020/update').toPromise()
    ////console.log(data)
    this.listdatas=data
    this.editall=false
    this.rest.Toast_Success2('Đã lưu dữ liệu')
  }
  loading=true
  showdata(){

  }
  filtersearch=''
  checkemty(){}
}
