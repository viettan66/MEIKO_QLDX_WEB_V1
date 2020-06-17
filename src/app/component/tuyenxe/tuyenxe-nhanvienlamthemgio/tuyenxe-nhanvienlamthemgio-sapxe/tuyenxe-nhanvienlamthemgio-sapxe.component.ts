import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { ToastrService } from 'ngx-toastr';
import { SettingComponent } from 'src/app/component/setting/setting.component';
import { TuyenxeNhanvienlamthemgioChuyenxeComponent } from '../tuyenxe-nhanvienlamthemgio-chuyenxe/tuyenxe-nhanvienlamthemgio-chuyenxe.component';
declare var $:any
@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio-sapxe',
  templateUrl: './tuyenxe-nhanvienlamthemgio-sapxe.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio-sapxe.component.css']
})
export class TuyenxeNhanvienlamthemgioSapxeComponent implements OnInit {

  constructor(public rest: RESTService,public toasts:ToastrService) { }
  listdiemdon = []
  listdiemtaxi = []
  listTUYENtaxi = []
  listkhunggio = []
  listtab = []
  tab = 999;
  thiskhunggio: any
  gettab($event) {
    this.tab = $event
    this.thiskhunggio=this.listkhunggio.length > 0 ? this.listkhunggio[$event] : null
    this.showdon()
  }
  async ngOnInit() {
    
    this.listkhunggio= await this.rest.GetDataFromAPI<any[]>('DX0070/Getall/all').toPromise()
    for (const x of this.listkhunggio) {
      this.listtab.push({ label: x.tenKhungGio, classs: 'fad fa-clock' })
    }
    // let data = await this.rest.GetDataFromAPI<any[]>('DX0001/Getdondangkylamthem1').toPromise()
    // for (const x of data) {
    //   let k = await this.rest.GetDataFromAPI<any>('DX0070/getall/' + x.T007C).toPromise()
    //   x.DX0070 = k.length > 0 ? k[0] : null
    //   let kk = await this.rest.GetDataFromAPI<any>('DX0011/getall/' + x.T008C).toPromise()
    //   x.DX0011 = kk.length > 0 ? kk[0] : null
    // }
    // this.listdons = data
    this.gettab(0)
  }
  async xoadondangky() {

   }
   async showdon() {
    //this.listdiemdon=await this.rest.GetDataFromAPI<any[]>('dx0011/getalldiemdonduocditaxi/'+this.thiskhunggio.DX0070_ID).toPromise()
    let data=await this.rest.PostDataToAPI<any[]>({DX0070_ID:this.thiskhunggio.DX0070_ID},'lamthemgio/getall').toPromise() 
    this.listTUYENtaxi=data
    this.listTUYENtaxi.map(x=>{
      x.listtab=[]
      x.DX0010D.map(f=>{
        x.listtab.push({ label: f.DX0011.tenDiemDon,DX0011_ID: f.DX0011.DX0011_ID, classs: 'fad fa-map-marker-alt',count: f.count})
      })
    })
    console.log(data)
    }
  async pheduyetdondangky() {
  }
  edititem(item) {
    item.edit = !item.edit
    if (!item.edit) {

    }
  }
  sendform(){
    console.log('jhdjdkjfdjfkj')
  }
  thisDX0010
  thisDX0010D
  show(item) {
    this.listTUYENtaxi.filter(x=>x!==item).map(x=>x.show=false)
    
    this.thisDX0010 = item
    console.log(this.thisDX0010)
    console.log(this.thisDX0010D)
    this.thisDX0010.show=!this.thisDX0010.show
  }
  thistuyentaxi
  slot=4
  sapxetaxi(item){
    item.listdata=[]
    item.listtab.map(s=>{
      s.count.map(x=>{
        x.DX0011_ID=s.DX0011_ID
        x.tenDiemDon=s.label
      })
      return s.count
    }).map(f=>item.listdata=$.merge( item.listdata,f ) )
    console.log(item.listdata )
    this.thistuyentaxi=item
    console.log(item)
    $('#chitietdiemtaxi').modal()
    
  }
  async sapxengay() {
    let DX0060 = []
    for (let index = 0; index < this.thistuyentaxi.listdata.length; index++) {
      this.thistuyentaxi.listdata[index].xe = Math.floor(((index / (this.slot - 0)) + 1))
    }
    for (let index = 1; index <= Math.floor(((this.thistuyentaxi.listdata.length / (this.slot - 0)) + 1)); index++) {
      let DX0061= this.thistuyentaxi.listdata.filter(x => x.xe === index)
      let khunggioid=DX0061.length>0?DX0061[0].T007C:null
      let ghichu=this.thistuyentaxi.tenTuyenXe+"->"+[...new Set(this.thistuyentaxi.listdata.filter(x => x.xe === index).map(x=>x.tenDiemDon))].join("->")
      DX0060.push({DX0061:DX0061,ghiChu:ghichu,DX0070_ID:khunggioid})
    }
    let k=await this.rest.PostDataToAPI<any>(DX0060,'DX0060/add').toPromise()
    this.toasts.success("Đã sắp "+k.filter(x=>x.code==="OK").length+" xe cho "+this.thistuyentaxi.listdata.length+' người.',null,{closeButton:true})
    this.thistuyentaxi.listdata=[]
    console.log(DX0060)
    console.log(k)
  }
  toast(){
    //this.toasts.
    this.toasts.success("Hello, I'm the toastr message.","Test nhé")
    this.toasts.info("Hello, I'm the toastr message.")
    this.toasts.warning("Hello, I'm the toastr message.")
    this.toasts.error("Hello, I'm the toastr message.")
  }
}
