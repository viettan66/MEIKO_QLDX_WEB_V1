import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import * as global from '../../Service/global'
import { Toast, ToastrService } from 'ngx-toastr';
declare var $: any
@Component({
  selector: 'app-bangsapca',
  templateUrl: './bangsapca.component.html',
  styleUrls: ['./bangsapca.component.css']
})
export class BangsapcaComponent implements OnInit {
  thangnhapthucong=0
  color=global.color
  start
  step
  max=0
  min=9999
  listdata = []
  listkhunggio = []
  listdatadiemdon = []
  datafile = []
  listDX0020 = []
  listcalamviec = []
  listdiemdon = []
  listdiemdontaxi = []
  listdanhsachyeucautaxihomnay = []
  tenfile=''
  user
  filternhanvien=999
  listtab = [
    {label:'Tháng', classs: 'fad fa-calendar-alt'},
    {label:'Ngày '+new Date().toLocaleDateString(), classs: 'fad fa-clock'}
  ]
  tab = 0;
  gettab($event){
    this.tab=$event
  }
  constructor(public rest: RESTService) { 
    
    this.user=rest.getUser('loginSO')
  }

  async ngOnInit() {
    this.listcalamviec = await this.rest.GetDataFromAPI<any[]>('DX0080/getall').toPromise()
    this.listDX0020 = await this.rest.GetDataFromAPI<any[]>('DX0020/getall').toPromise()
    this.listdiemdon = await this.rest.GetDataFromAPI<any[]>('DX0011/getall/all').toPromise()
    this.listdiemdontaxi = await this.rest.GetDataFromAPI<any[]>('DX0011/getalldiemtaxi').toPromise()
    this.listkhunggio =await this.rest.GetDataFromAPI<any[]>('DX0070/Getall/all').toPromise()
    this.listdanhsachyeucautaxihomnay =await this.rest.GetDataFromAPI<any[]>('DX0001/view_danhsachyeucautaxihomnay').toPromise()
    if(this.datafile.length==0){
      let kkk=localStorage.getItem('BangSapCa')
      if(kkk!=null){
        this.datafile=JSON.parse(kkk).data
        this.tenfile=JSON.parse(kkk).filename
      }
    }
    this.thongke()
  }
  async getdata($event) {
    var input = document.createElement('input');
      input.type = 'file';
      input.onchange = async e => {
      let data= await this.rest.ReadExcelFile(input.files[0])
      this.datafile = data
      this.tenfile=input.files[0].name
         let name = this.tenfile.toUpperCase()
        let lll = (+(name.substring(name.lastIndexOf('NG') + 2, name.indexOf('.')) ))
        if (isNaN(lll) == true||lll!=new Date().getMonth()+1) {
         this.rest.Toast_Error("File bạn upload không hợp lệ, khác tháng hiện tại hoặc tên file không đúng định dạng.",'Thông báo',{timeOut:10000})
         return false
        }
      localStorage.removeItem('BangSapCa')
      localStorage.setItem('BangSapCa',JSON.stringify({filename:this.tenfile,data:this.datafile}) )
      this.thongke()
     
      this.batdausapxe ()
      this.rest.Toast_Success("Đã cập nhật lại dữ liệu...",'Thông báo',{timeOut:10000})
      }
      input.click();
  }
  async batdausapxe() {
    this.danhsachsapxetubangsapca = []
    let arr = []
    let list = this.listdata.filter(c => c.ca.DX0070_ID !== null);
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].data.length; j++) {
        let kj = []
        for (let k = 0; k < list[i].data[j].list.length; k++) {
          let temp = this.listDX0020.filter(ll => ll.manhansu === list[i].data[j].list[k])
          if (temp.length > 0) {
            var obj: any = {};
            obj.DX0070_ID = list[i].ca.DX0070_ID
            obj.ngayTao = j
            obj.DX0010_ID = temp[0].DX0010_ID
            obj.DX0011_ID = temp[0].DX0011_ID
            obj.DX0020_ID = temp[0].DX0020_ID
            obj.capbac = temp[0].capbac
            obj.chucvu = temp[0].chucvu
            obj.diachithuongtru = temp[0].diachithuongtru
            obj.dienthoai_didong = temp[0].dienthoai_didong
            obj.email = temp[0].email
            obj.hodem = temp[0].hodem
            obj.manhansu = temp[0].manhansu
            obj.tenDiemDon = temp[0].tenDiemDon
            obj.tenTuyenXe = temp[0].tenTuyenXe
            obj.thoiGianSuDung = temp[0].thoiGianSuDung
            obj.trangThai = temp[0].trangThai
            if (j + 1 > new Date().getDate()) {
              kj.push(obj)
            }
          }
        }
        arr = $.merge(arr, kj)
      }
    }
    ////console.log(arr);
    let year=new Date().getFullYear()
    let m=new Date().getMonth()+1
    let month=m<10?('0'+m):(m+'')
    arr.filter(g => this.listdiemdontaxi.includes(g.DX0011_ID)).map(v => {

      this.danhsachsapxetubangsapca.push({
        trangThai: 2
        , hoVaTen: v.hodem
        , maForm: 'SF015'
        , ngayTao: year+'-'+month+'-'+ (v.ngayTao<10?('0'+v.ngayTao):(v.ngayTao+''))
        , T001C: v.hodem
        , T002C: v.manhansu
        , T003C: ''
        , T004C: v.dienthoai_didong
        , T005C: v.capbac
        , T006C: v.diachithuongtru
        , T007C: v.DX0070_ID
        , T008C: 'Form tạo tự động từ bảng sắp ca bởi ' + (this.user != null ? this.user.displayName : '')
        , thongbao: false
      })
    })
    ////console.log(this.danhsachsapxetubangsapca)
    let data=await this.rest.PostDataToAPI<any[]>(this.danhsachsapxetubangsapca,"DX0001/addsapca").toPromise()
    ////console.log(data)
  }
  thongke(){
    
    this.listdata=[]
    this.listdatadiemdon=[]
    this.listcalamviec.map(x => {
    this.listdata.push({
      ca: x
    })
  })
    let arrDX0020 = this.listDX0020.map(x => x.manhansu)
    let arrdatalist = this.datafile.filter(c => arrDX0020.includes(c['Mã nhân viên']))
    //////console.log(arrdatalist)
    for(const x of this.listdata){
      x.data=[]
      for(let i=0;i<31;i++){
        let key=(i+1)<10?("0"+(i+1)):(i+1)
        let list=arrdatalist.filter(c=>c[key]===x.ca.maCa)
        let count=list.length
        x.data.push({count:count,color:0,list:list.map(f=>f['Mã nhân viên']),ngay:key})
        if(count>this.max)this.max=count
        if(count<this.min)this.min=count
      }
    }
    this.listdata.map(x=>{
      for(let i=0;i<31;i++){
        let cal=(x.data[i].count/this.max)*10
        x.data[i].color=Math.floor((cal>0?(cal+1):0))
      }
    })
    this.max=0
    ////console.log(this.listdata)
    this.listdiemdon.map(x => {
      let data = []
      this.listcalamviec.filter(fff=>fff.DX0070_ID!=null).map(f => {
        let date = new Date().getDate()
        let key = (date) < 10 ? ("0" + (date)) : (date)
        let listtemp = arrdatalist.filter(cc => cc[key] === f.maCa).map(cc => cc['Mã nhân viên'])
        let list = this.listDX0020.filter(cc => listtemp.includes(cc.manhansu) &&
         cc.DX0011_ID === x.DX0011_ID)
        let count = list.length
        if (count > this.max) this.max = count

        data.push({
          ca: f.maCa,
          diem:x.tenDiemDon,
          count: count,
          color: 0,
          list:list
        })
      })
      this.listdatadiemdon.push({
        tendiemdon: x.tenDiemDon,
        data: data
      })
    })
    
    this.listdatadiemdon.map((x)=>{
      let kl=this.listcalamviec.filter(fff=>fff.DX0070_ID!=null)
      for(let i=0;i<kl.length;i++){
        let cal=(x.data[i].count/this.max)*10
        x.data[i].color=Math.floor((cal>0?(cal+1):0))
        x[kl[i].maCa]=x.data[i].count
      }
    })
  }
  getstep($event) {}
  getstart($event) {}
  showsetting() {
    $('#settingmodal').modal()
  }
  closemodal(){
    $('#settingmodal').modal('hide')
    this.thongke()
  }
  async themcathognke() {
    let data = await this.rest.PostDataToAPI<any[]>([{}], 'DX0080/add').toPromise()
    ////console.log(data)
    data.filter(c => c.code === "OK").map(x => {
      this.listcalamviec.push(x.data)
      this.rest.Toast_Success2("Thêm 1 ca thống kê thành công.",null,5000,true)
    })
    this.thongke()
  }
  async xoacalamviec(){
    let data = await this.rest.PostDataToAPI<any[]>(this.listcalamviec.filter(c=>c.check), 'DX0080/delete').toPromise()
    ////console.log(data)
    data.filter(c=>c.code==="OK").map(x=>{
      this.listcalamviec.filter(c=>c.DX0080_ID===x.data.DX0080_ID).map(i=>this.listcalamviec.splice(this.listcalamviec.indexOf(i),1))
      this.rest.Toast_Success2("Xóa 1 ca thống kê thành công.",null,5000,true)
    })
    this.thongke()
  }
  async editca(item) {
    item.edit = !item.edit
    if (!item.edit) {
      item.DX0070_ID=item.DX0070_ID==''?null:item.DX0070_ID
      let data = await this.rest.PostDataToAPI<any[]>([item], 'DX0080/add').toPromise()
      ////console.log(data)
      this.rest.Toast_Success2("Lưu thành công.",null,5000,true)
    }
  }
  listnhanviendilam=[]
  thisngay:any
  thisca:any
  chitietngay(item,item2) {
    this.thisca=item2
    if (item == undefined) {
      ////console.log('null')
      return
    }
    this.thisngay=item
    this.listnhanviendilam=[]
    ////console.log(item)
    this.listnhanviendilam=this.listDX0020.filter(c=>item.list.includes(c.manhansu))
    ////console.log(this.listnhanviendilam)
    $("#chitietngay").modal()
  }
  getlistdatadiemdion($event){
    this.listdatadiemdon=$event
    ////console.log($event)
  }
  thisdiemcuangay
  newdate=new Date().toLocaleDateString()
  xemchitietdiemcuangay(item){
    ////console.log(item)
    this.thisdiemcuangay=item
    $("#chitietngaydiemdon").modal()
  }
  filkhunggio(kk){
  let k=this.listkhunggio.filter(g=>g.DX0070_ID===kk).map(x=>x.tenKhungGio).join('') 
  return k==''?'Trống':k
  }
  danhsachsapxetubangsapca=[]
  async dongysapxe(){
    if(this.danhsachsapxetubangsapca.filter(c=>c.taodonhomnay===(this.filternhanvien-0)||(this.filternhanvien-0)===999).filter(c=>c.check).length==0){
        this.rest.Toast_Info('Bạn phải chọn ít nhất 1 người để tạo đơn yêu cầu taxi.',null,{timeOut:10000,closeButton:true,positionClass:'toast-bottom-right'})
        return false
    }
    //this.rest.Toast_Warning("Bạn chưa chọn điểm đón cần sắp xe.",null,{positionClass:'toast-bottom-right'})
    if(this.danhsachsapxetubangsapca.filter(c=>c.taodonhomnay===(this.filternhanvien-0)||(this.filternhanvien-0)===999).filter(c=>c.check).filter(c=>c.taodonhomnay!==0).length>0){
      if(!confirm(`Trong danh sách đã chọn, có những người đã có đơn yêu cầu xe taxi. Bạn có muốn tiếp tục?`)){
        return false
      }
    }
    let result=await this.rest.PostDataToAPI<any[]>(this.danhsachsapxetubangsapca.filter(c=>c.taodonhomnay===(this.filternhanvien-0)||(this.filternhanvien-0)===999).filter(c=>c.check),'DX0001/add').toPromise();
   ////console.log(result)
    this.rest.Toast_Success("Đã khởi tạo yêu cầu xe taxi cho "+result.filter(x=>x.code==='OK').length+' nhân viên. Xin mời bạn sử dụng chức năng sắp xe.',null,{timeOut:15000,positionClass:'toast-bottom-right'})
    result.filter(c=>c.code==="OK").map(x=>{
      this.danhsachsapxetubangsapca.filter(c=>c.T002C===x.data.T002C).map(i=>this.danhsachsapxetubangsapca.splice(this.danhsachsapxetubangsapca.indexOf(i),1))
    })
  }
  thisngayclick=''
  listallnhanviendixengay=[]
  listalldiemdondixengay=[]
  showdetailngaycuathang(i){
  this.listallnhanviendixengay=[]
  this.listalldiemdondixengay=[]
    this.thisngayclick= i<10?('0'+i):i
    let index=i-1
    let arr=[]
    this.listdata.map(x=>{
      arr=$.merge(arr,x.data[index].list)
    })
    this.listallnhanviendixengay=this.listDX0020.filter(c=>arr.includes(c.manhansu))
    let listdiem=[]
    this.listallnhanviendixengay.map(xx=>listdiem.push(xx.DX0011_ID));
    
    [...new Set(listdiem)].map(g=>{
      let diem
      this.listdiemdon.filter(p=>p.DX0011_ID===g).map(p=>diem=p.tenDiemDon)
      this.listalldiemdondixengay.push({
        diem:diem,
        count:listdiem.filter(v=>v===g).length
      })
    })
    ////console.log(this.listallnhanviendixengay)
    ////console.log(arr)
    $("#my-chitietngaycuathangmodal").modal()
  }
  thisindex
}

