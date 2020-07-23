import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any
@Component({
  selector: 'app-tuyenxe-quanlythanhtoan',
  templateUrl: './tuyenxe-quanlythanhtoan.component.html',
  styleUrls: ['./tuyenxe-quanlythanhtoan.component.css']
})
export class TuyenxeQuanlythanhtoanComponent implements OnInit {

  constructor(public rest:RESTService) { }
tab=3
datenow=new Date().toLocaleDateString('en-GB')
listdatas=[]
listdata=[]
start=0
step=20
  async ngOnInit() {
    this.listdatas=await this.rest.GetDataFromAPI<any[]>('Quanlythanhtoan/getall').toPromise()
    this.getdata()
  }
  async getdata(){
    //console.log(this.listdatas)
    switch(this.tab){
      case 0:
        this.listdata=this.listdatas
        break;
      case 1:
        this.listdata=this.listdatas.filter(c=>c.tienTrinh===9)
        break;
      case 2:
        this.listdata=this.listdatas.filter(c=>c.tienTrinh===1)
        break;
    }
  }
  thisthanhtoan
  thanhtoan(item){
    item.vietbangchu=this.rest.docso(item.thanhTienThucTe)
    item.thanhToan=item.thanhTienThucTe
    this.thisthanhtoan=item
    if(item.loaiThanhToan==1)
    $('#mymodalthanhtoan').modal()
    if(item.loaiThanhToan==2)
    $('#mymodaltruythu').modal()
  }
  async thanhtoanthis(){
    let data=await this.rest.GetDataFromAPI<any>('DX0060/updatetrangthaicuoctaxi/'+this.thisthanhtoan.manhansu+'/'+this.thisthanhtoan.loaiThanhToan).toPromise()
    //console.log(data)
    if(data.code==="OK"){
      let dx0064:any={}
      dx0064.ID =this.thisthanhtoan.manhansu
      dx0064.capBac =this.thisthanhtoan.capbac
      dx0064.chucVu =this.thisthanhtoan.chucvu
      dx0064.cmtnd =this.thisthanhtoan.cmtnd_so
      dx0064.boPhan =this.thisthanhtoan.diachithuongtru
      dx0064.mobile =this.thisthanhtoan.dienthoai_didong
      dx0064.email =this.thisthanhtoan.email
      dx0064.hoTen =this.thisthanhtoan.hodem
      dx0064.loai=this.thisthanhtoan.loaiThanhToan
      dx0064.tong=this.thisthanhtoan.thanhTienThucTe
      dx0064.thanhToan=this.thisthanhtoan.thanhToan
      dx0064.vietBangChu =this.thisthanhtoan.vietbangchu
      dx0064.noiDung =this.thisthanhtoan.noidung
      dx0064.trangThai=dx0064.tong==dx0064.thanhToan
      dx0064.ngayThanhToan=new Date()
      let relsult=await this.rest.PostDataToAPI<any[]>([dx0064],'Quanlythanhtoan/add').toPromise()
      //console.log(relsult)
      if(relsult[0].code=="OK"){
        $('#mymodalthanhtoan').modal('hide')
        $('#mymodaltruythu').modal('hide')
        this.listdatas.filter(j=>j.manhansu===relsult[0].data.ID).map(h=>this.listdatas.splice(this.listdatas.indexOf(h),1))
        this.getdata()
        this.rest.Toast_Success2("Thành công.")
      }
    }
  }
  doiso(item){
    item.vietbangchu=this.rest.docso(item.thanhToan)
  }
  
  check(row: any) {
    if (row["thanhToan"] > row["thanhTienThucTe"]) {
      row["thanhToan"] = row["thanhTienThucTe"];
      this.rest.Toast_Warning("Số tiền nhập vượt quá chi phí cần thanh toán.")
    }
    else if(row.thanhToan<0){
      row.thanhToan=0
    }
  }
}
