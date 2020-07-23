import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $: any
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent implements OnInit {

  constructor(public rest: RESTService) { }
  listdata = []
  datenow = new Date().toLocaleDateString('en-GB')
  async ngOnInit() {
    this.filter()

    $(document).ready(function () {
      $('.kjdkfjk').datetimepicker()
    })
  }
  thisthanhtoan
  filtertrangthai = 999
  filterloai = 999
  start=0
  step=20
  async filter() {
    this.listdata = await this.rest.PostDataToAPI<any[]>({id:this.filtersearch,trangthai:this.filtertrangthai,loai:this.filterloai},'DX0064/getall').toPromise()
    //console.log(this.listdata)

  }
  doiso(item) {
    item.vietbangchu = this.rest.docso(item.thanhToan)
  }
  showchitiet(item) {
    this.thisthanhtoan = item

    if (item.loai == 1)
      $('#mymodalthanhtoan').modal()
    if (item.loai == 2)
      $('#mymodaltruythu').modal()
  }
  async thanhtoanthis() {
    {
      let relsult = await this.rest.PostDataToAPI<any[]>([this.thisthanhtoan], 'Quanlythanhtoan/add').toPromise()
      //console.log(relsult)
      if(relsult[0].code==="UPDATE"){
        // this.thisthanhtoan= relsult[0].data;
        this.thisthanhtoan.boPhan = relsult[0].data.boPhan;
        this.thisthanhtoan.capBac = relsult[0].data.capBac;
        this.thisthanhtoan.chucVu = relsult[0].data.chucVu;
        this.thisthanhtoan.cmtnd = relsult[0].data.cmtnd;
        this.thisthanhtoan.email = relsult[0].data.email;
        this.thisthanhtoan.hoTen = relsult[0].data.hoTen;
        this.thisthanhtoan.ID = relsult[0].data.ID;
        this.thisthanhtoan.mobile = relsult[0].data.mobile;
        this.thisthanhtoan.ngayThanhToan = relsult[0].data.ngayThanhToan;
        this.thisthanhtoan.noiDung = relsult[0].data.noiDung;
        this.thisthanhtoan.thanhToan = relsult[0].data.thanhToan;
        this.thisthanhtoan.tong = relsult[0].data.tong;
        this.thisthanhtoan.vietBangChu = relsult[0].data.vietBangChu;
        this.thisthanhtoan.trangThai = relsult[0].data.trangThai;
        this.rest.Toast_Success("Updat thành công.","thông báo")
        $('#mymodalthanhtoan').modal('hide')
      }
    }
  }
  check(row: any) {
    //console.log(row["tong"], row["thanhToan"]);
    if (row["thanhToan"] > row["tong"]) {
      row["thanhToan"] = row["tong"];
    }
    else if(row.thanhToan<0){
      row.thanhToan=0
    }
  }
  filtersearch=''
  checkemty(){
    if(this.filtersearch=='')this.filter()
  }
}
