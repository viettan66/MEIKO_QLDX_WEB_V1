import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { ToastrService } from 'ngx-toastr';
import * as Global from '../../../Service/global'
declare var $: any

@Component({
  selector: 'app-tuyenxe-nhanviendicongtac',
  templateUrl: './tuyenxe-nhanviendicongtac.component.html',
  styleUrls: ['./tuyenxe-nhanviendicongtac.component.css']
})
export class TuyenxeNhanviendicongtacComponent implements OnInit {

  constructor(public rest: RESTService, public toasts: ToastrService) { 
    this.user=this.rest.getUser('loginSO')}
  listdons = []
  listdon = []
  listcuocxe = []
  tab = 0
  start=0
  step=20
  start1=0
  step1=20
  filtersearch=''
  listtab = [
    { label: 'Danh sách', classs: 'fad fa-list' },
    { label: 'Chuyến xe', classs: 'fad fa-bus' }
  ]
  gettab($event) {
    this.tab = $event
  }
  loading=true
  user:any={}
  async ngOnInit() {
    
    let data=await this.rest.Get<any>(Global.APIGetDon+'all').toPromise()
    ////console.log(data)
   let result=await this.rest.PostDataToAPI<any[]>(data.data,'DX0001/add').toPromise();
   ////console.log(result)
    result.filter(c=>c.code==="EXIST"||c.code==="OK").map(async x=>{
      let data2=await this.rest.Get<any>(Global.APIUpdateDon+x.data.A0028_ID).toPromise()
      ////console.log(data2)
    })

    this.listcuocxe = await this.rest.PostDataToAPI<any>({}, 'DX0062/getall').toPromise()
    ////console.log(this.listcuocxe)
    this.filter()
    this.filtercuocxe()
    this.loading=false
  }
  async xoadondangky() {
    if (!confirm(`Bạn chắc chắn muốn xóa ` + this.listdon.filter(c => c.check).length + ` yêu cầu taxi không?`)) {
      return false
    }
    let data = await this.rest.PostDataToAPI<any[]>(this.listdon.filter(c => c.check), 'DX0001/delete').toPromise();
    ////console.log(data)
    this.toasts.warning("Đã xóa " + data.filter(c => c.code === "DELETE").length + " yêu cầu.", null, { timeOut: 10000, closeButton: true,positionClass:'toast-bottom-right' })
    data.filter(c => c.code === "DELETE").map(x => {
      this.listdon.filter(c => c.DX0001_ID === x.data.DX0001_ID).map(i => this.listdon.splice(this.listdon.indexOf(i), 1))
    })
  }
  // async pheduyetdondangky() {
  //   this.guimailthongbao()
  //   if(this.listdon.filter(c => c.check).filter(c=>c.trangThai!=1).length>0){
  //     this.toasts.warning('Bạn không thể duyệt đơn nếu chọn lẫn đơn đã duyệt hoặc đã sắp xe','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
  //     return false
  //   }
  //   this.listdon.filter(c => c.maForm === 'SF013' && c.check).map(x => x.trangThai = 2)
  //   let data = await this.rest.PostDataToAPI<any>(this.listdon.filter(c => c.maForm === 'SF013' && c.check), 'DX0001/update').toPromise()
  //   this.toasts.success('Đã phê duyệt thành công cho '+this.listdon.filter(c => c.check).length+' đơn.','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
  //   //data.filter(c => c.code === "OK").map(x => this.listdon.filter(c => c.DX0001_ID === x.data.DX0001_ID).map(c => this.listdon.splice(this.listdon.indexOf(c), 1)))
  //   ////console.log(data)
  // }
  DX0062: any = {}
  async setupcuocxe(f) {
    //this.DX0062={}
    this.typecuocxe=f
    if(this.typecuocxe==1)
    if(this.listdon.filter(c => c.check).filter(c=>c.trangThai!=1).length>0){
      this.toasts.warning('Bạn không thể tạo cuốc xe nếu chọn lẫn đơn chưa duyệt hoặc đã sắp xe','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      return false
    }
    if(this.typecuocxe==2)
    if(this.listdon.filter(c => c.check).filter(c=>c.tinhTrang!=1&&c.tinhtrang!=null).length>0){
      this.toasts.warning('Bạn không thể tạo cuốc xe nếu chọn lẫn đơn chưa duyệt hoặc đã sắp xe','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      return false
    }
    if(this.typecuocxe==3)
    if(this.listdon.filter(c => c.check).filter(c=>c.tinhTrang!=1&&c.tinhTrang!=null||c.trangThai!=1&&c.trangThai!=null).length>0){
      this.toasts.warning('Bạn không thể tạo cuốc xe nếu chọn lẫn đơn chưa duyệt hoặc đã sắp xe','Thông báo',{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
      return false
    }
    $('#my-modalsetupcuocxe').modal()
  }
  typecuocxe
  async taocuocxe() {
    this.DX0062.tienTrinh = 1
    this.DX0062.type = this.typecuocxe
    let DX0063 = []
    this.listdon.filter(c => c.maForm === 'SF013' && c.check).map(b => {
      DX0063.push({
        DX0001_ID: b.DX0001_ID,
        ghiChu: ''
      })
    })
    this.DX0062.DX0063 = DX0063
    let k = await this.rest.PostDataToAPI<any>([this.DX0062], 'DX0062/add').toPromise()
    this.toasts.success("Đã sắp " + k.filter(x => x.code === "OK").length + " xe cho " + this.listdon.filter(c => c.maForm === 'SF013' && c.check).length + ' yêu cầu.', null, { closeButton: true,positionClass:'toast-bottom-right' })
    $('#my-modalsetupcuocxe').modal('hide')
    ////console.log(DX0063)
    ////console.log(k)
    k.filter(c => c.code === "OK").map(o => {
      this.listcuocxe.push(o.data)
      o.data.DX0063.map(f => {
        this.listdon.filter(x => x.DX0001_ID === f.DX0001_ID).map(x =>{
          if(this.typecuocxe==1)
          x.trangThai =2
          if(this.typecuocxe==2)
          x.tinhtrang =2
          if(this.typecuocxe==3){
            x.tinhtrang =2
            x.trangThai =2
          }
          
        } )
      })
    })
  }
  edititem(item) {
    item.edit = !item.edit
    if (!item.edit) {
    }
  }
  filt = '1'
  async filter() {
    let data = await this.rest.GetDataFromAPI<any[]>('DX0001/Getdondicongtac/' + this.filt).toPromise()
    this.listdon = data
  }
  gettimedi($event) { this.DX0062.thoiGianDi = $event }
  gettimeve($event) { this.DX0062.thoiGianVe = $event }
  async update(item) {
    if ((item.soKmCuoi - 0) < (item.soKmDau - 0)) {
      this.toasts.warning("Số KM cuối bắt buộc phải lớn hơn KM đầu", 'Lỗi nhập liệu', { timeOut: 15000, closeButton: true ,positionClass:'toast-bottom-right'})
      return false
    }
    item.tongKM = (item.soKmCuoi - 0) - (item.soKmDau - 0)
    let data = await this.rest.PostDataToAPI<any>([item], 'DX0062/add').toPromise();
    //////console.log(data)
  }
  getngaydi($event, item) {
    item.thoiGianDi = $event
    this.update(item)
  }
  getngayve($event, item) {
    item.thoiGianVe = $event
  }
  async xoacuocxe() {
    if (this.listcuocxe.filter(c => c.check).length == 0) {
      this.toasts.warning("Bạn phải chọn ít nhất 1 cuốc xe để xóa!", 'Thông báo', { timeOut: 15000, closeButton: true ,positionClass:'toast-bottom-right'})
      return false
    }
    if (!confirm(`Bạn chắc chắn muốn XÓA ` + this.listcuocxe.filter(c => c.check).length + ` chuyến xe không? Những nhân viên có lịch trong xe này cần sắp xe lại.`)) {
      return false
    }
    let data = await this.rest.PostDataToAPI<any>(this.listcuocxe.filter(x => x.check), 'DX0062/delete').toPromise()
    ////console.log(data)
    let i = 0
    data.filter(c => c.code === "DELETE").map(x => {
      i++
      this.listcuocxe.filter(c => c.DX0062_ID === x.data.DX0062_ID).map(i => this.listcuocxe.splice(this.listcuocxe.indexOf(i), 1))
    })
    this.toasts.success("Đã xóa thành công " + i + ' cuốc xe. lưu ý đặt lại lịch xe cho nhân viên trong xe đó.', 'Thông báo', { timeOut: 15000, closeButton: true ,positionClass:'toast-bottom-right'})
    this.filter()
  }
  filtertinhtrang = 999
  filterloaicuoc = 999
  async filtercuocxe() {
    let d = await this.rest.PostDataToAPI<any>({ tienTrinh: this.filtertinhtrang ,type:this.filterloaicuoc }, 'DX0062/getall').toPromise()
    ////console.log(d)
    this.listcuocxe = d
  }
  async guimailthongbao(){
      let body='<br>'
      this.listdon.filter(c=>c.check).map(async x=>{
        if(x.T019C==null||x.T019C==undefined||x.T019C=='')return
        let noidung=`<b>Gửi anh/chị: `+x.T001C+`</b><br>
        <p>Bạn nhận được một thông báo về kết quả đơn <b>Đăng ký sử dụng xe đi công tác</b> của bạn từ hệ thống.</p>
        <p>Thông tin chi tiết:</p>
         <p>Kết quả duyệt từ GA: Duyệt</p>
  <p>Ý kiến của người duyệt (nếu có): </p>
  <p>Người duyệt: `+this.user.displayName+`</p>
 <p>Ghi chú: Vui lòng không reply lại email này !</p>`
        let data=await this.rest.PostDataToAPI<any>({to:x.T019C,subject:'[GA] Phê duyệt yêu cầu đặt xe công tác',bobdy:(noidung+ body)},'Mail/sendmail').toPromise()
        if(data.code=="OK"){
          // let rel= await this.rest.GetDataFromAPI<any>('lamthemgio/isthongbao/'+x.DX0001_ID).toPromise()
          // if(rel.code=="OK"){
          //   x.thongbao=true
          // }
  this.toasts.success("Gửi mail thông báo tới "+x.T001C+' ('+x.T002C+')',null,{positionClass:'toast-bottom-right'})
        }
        ////console.log(data)
      })
      
    }
    showdetailcuocxe(item){
      this.listcuocxe.filter(c=>c!=item).map(x=>x.show=false)
      item.show=!item.show
    }
    async deletedondangkyrakhoicuocxe(item,item2){
      if(item.DX0063.length==1){
        this.toasts.warning("Chỉ còn 1 đơn yêu cầu xe trong cuốc xe. Bạn có thể xóa cuốc xe thay vì xóa đơn yêu cầu cuối cùng.","Không hợp lệ",{closeButton:true,timeOut:20000})
        return false
      }
      ////console.log(item)
      ////console.log(item2)
      let data=await this.rest.GetDataFromAPI<any>("DX0062/deletedondangkyrakhoicuocxe/"+item2.DX0063_ID).toPromise()
      ////console.log(data)
      if(data.code==="DELETE"){
        item.DX0063.splice(item.DX0063.indexOf(item2),1)
        this.toasts.success("Đã xóa 1 đơn yêu cầu xe ra khỏi cuốc xe. Xin vui lòng thông báo lại cho người đặt xe.",null,{timeOut:20000,closeButton:true,positionClass:'toast-bottom-right'})
        this.filter()
      }
    }
    thisitem
    thistype
  themdondangkyvaocuocxe(item) {
    this.thisitem = item
    this.thistype = item.type
    $('#my-modalthemdondatxevaocuocxe').modal()
  }
  async savedondangkyvaocuocxe() {
    let arr = []
    if (this.thistype == 1)
      arr = this.listdon.filter(c => c.check && c.trangThai == 1)
    if (this.thistype == 2)
      arr = this.listdon.filter(c => c.check && c.tinhtrang == 1)
    if (this.thistype == 3)
      arr = this.listdon.filter(c => c.check && c.tinhtrang == 1 && c.trangThai == 1)
    Promise.all(arr.map(async x => {
      let data = await this.rest.GetDataFromAPI<any>('DX0062/themdondangkyvaocuocxe/' + x.DX0001_ID + '/' + this.thisitem.DX0062_ID).toPromise()
      ////console.log(data)
      if (data.code === "OK") {
        this.thisitem.DX0063 = data.data.DX0063
      }
    })
    ).then(f => {
      this.filter()
    })
  }
  show($event){
    //console.log($event)
  }
}
