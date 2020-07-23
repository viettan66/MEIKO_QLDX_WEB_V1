import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { ToastrService } from 'ngx-toastr';
import { LatLng } from '@agm/core';
declare var $: any
@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio-sapxe',
  templateUrl: './tuyenxe-nhanvienlamthemgio-sapxe.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio-sapxe.component.css']
})
export class TuyenxeNhanvienlamthemgioSapxeComponent implements OnInit {
@Input() pending
@Output('pending')jjjj=new EventEmitter<boolean>()
  constructor(public rest: RESTService, public toasts: ToastrService) {
    this.user = this.rest.getUser('loginSO')
    //let ll= google.maps.GeocoderStatus.OK
  }
  user: any = {}
  listkhunggio = []
  listtab = []
  listdata = []
  tab = 999;
  thiskhunggio: any
  issave=true
  gettab($event) {
    if(!this.issave){
      if(!confirm(`Bạn chưa lưu dữ liệu sắp xe, xác nhận đổi tab?`)){
        return false
      }
    }
    this.issave=true
   this.jjjj.emit(false)
    this.tab = $event
    this.thiskhunggio = this.listkhunggio.length > 0 ? this.listkhunggio[$event] : null
    //////console.log(this.thiskhunggio)
    this.showdon()
  }
  async ngOnInit() {
    let that=this
    $(document).ready(function () {
      $('#mydiv').focus();
      $('#mydiv').on('contextmenu', function (e) {
        var top = e.pageY - 10;
        var left = e.pageX - 90;
        $("#context-menu").css({
          display: "block",
          top: top,
          left: left
        }).addClass("show");
        return false; //blocks default Webbrowser right click menu
      }).on("click", function () {
        $("#context-menu").removeClass("show").hide();
      });

      $("#context-menu a").on("click", function () {
        $(this).parent().removeClass("show").hide();
      });
      $("body").on("click", function () {
        $('#context-menu').removeClass("show").hide();
      });
      $('#mydiv').on('keydown', function(e) {
        if(e.which == 13) {
          that.themchuyenxe()
        }
      });
    })
    this.listkhunggio = await this.rest.GetDataFromAPI<any[]>('DX0070/Getall/all').toPromise()
    for (const x of this.listkhunggio) {
      this.listtab.push({ label: x.tenKhungGio, classs: 'fad fa-clock' })
    }
    this.gettab(0)
  }
  async showdon() {
    this.listdata=[]
    let data = await this.rest.GetDataFromAPI<any[]>('lamthemgio/Getall2/' + this.thiskhunggio.DX0070_ID).toPromise()
    data.map(j=>{
      this.listdata.push([j])
    })
    //this.listdata = data
    ////console.log(this.listdata)
  }
  checkall($event) {
    let kj=$event[0].check
    $event.map(f => {
      f.check = !kj
    })
  }
  checked(item?) {
    if (item != null)
      item.check = !item.check;
    let arr=[]
    this.listdata.map(h=>{
     arr=$.merge(arr,h.filter(j=>j.check).map(x => x.tenTuyenXe)) 
    })
    if ([...new Set(arr)].length > 1) {
      this.rest.Toast_Error("Bạn không thể sắp xe cho 2 người khác lộ trình. Nếu đây là chủ ý của bạn hãy thay đổi lộ trình tuyến taxi trong phần cài đặt trước.")
      item.check = !item.check;
      return false
    }
  }
  themchuyenxe() {
    this.issave=false
    this.pending=true
    this.jjjj.emit(true)
   let arr= []
   this.listdata.map(h=>{
     let kk=[]
     h.filter(c=>c.check).map(p=>{
       let obj:any={}
       Object.keys(p).forEach(key=>{
         obj[key]=p[key]
       })
       obj.check=false
       kk.push(obj)
       h.splice(h.indexOf(p),1)
      
     })
     arr=$.merge(arr,kk)
   })
     this.listdata.unshift(arr)
   this.listdata.filter(h=>h.length===0).map(h=>{
      this.listdata.splice(this.listdata.indexOf(h),1)
   })
     return
  }
  soluongghe=0;
  themchuyenxeauto(){
    
    this.issave=false
    this.pending=true
    this.jjjj.emit(true)
    $('#my-modalinputghe').modal()
  }
  gopxeauto(){
    $('#my-modalinputghe').modal('hide')
    if(this.soluongghe>0){
      let arr=[]
      this.listdata.map(x=>{
        x.map(h=>{
          arr.push(h)
        })
      })
      this.listdata=[]
      ////console.log(arr)
      let tuyenduong=[...new Set(arr.map(c=>c.tenTuyenXe))]
      ////console.log(tuyenduong)
      tuyenduong.map(g=>{
        let group=arr.filter(c=>c.tenTuyenXe===g)
        //////console.log(this.rest.chunkArray(group,this.soluongghe))
        this.listdata=$.merge(this.listdata,this.rest.chunkArray(group,this.soluongghe))
      })
      ////console.log(this.listdata)
    }else{
      this.rest.Toast_Error("Số lượng ghế không hợp lệ.")
    }
  }
  // show(item) {
  //   this.listTUYENtaxi.filter(x => x !== item).map(x => x.show = false)

  //   this.thisDX0010 = item
  //   ////console.log(this.thisDX0010)
  //   ////console.log(this.thisDX0010D)
  //   this.thisDX0010.show = !this.thisDX0010.show
  // }
  thistuyentaxi
  slot = 4
  // sapxetaxi(item) {
  //   item.listdata = []
  //   item.listtab.map(s => {
  //     s.count.map(x => {
  //       x.DX0011_ID = s.DX0011_ID
  //       x.tenDiemDon = s.label
  //     })
  //     return s.count
  //   }).map(f => item.listdata = $.merge(item.listdata, f))
  //   ////console.log(item.listdata)
  //   this.thistuyentaxi = item
  //   ////console.log(item)
  //   item.listdata.map(async c => {
  //     c.email = await this.rest.GetDataFromAPI<string>('DX0020/getemail/' + c.T002C).toPromise()
  //   })
  //   $('#chitietdiemtaxi').modal()

  // }
  // async sapxengay() {
  //   this.sendmail()
  //   let DX0060 = []
  //   for (let index = 0; index < this.thistuyentaxi.listdata.length; index++) {
  //     this.thistuyentaxi.listdata[index].xe = Math.floor(((index / (this.slot - 0)) + 1))
  //   }
  //   for (let index = 1; index <= Math.floor(((this.thistuyentaxi.listdata.length / (this.slot - 0)) + 1)); index++) {
  //     let DX0061 = this.thistuyentaxi.listdata.filter(x => x.xe === index)
  //     let khunggioid = DX0061.length > 0 ? DX0061[0].T007C : null
  //     let ghichu = this.thistuyentaxi.tenTuyenXe + "->" + [...new Set(this.thistuyentaxi.listdata.filter(x => x.xe === index).map(x => x.tenDiemDon))].join("->")
  //     DX0060.push({ DX0061: DX0061, ghiChu: ghichu, DX0070_ID: khunggioid })
  //   }
  //   let k = await this.rest.PostDataToAPI<any>(DX0060, 'DX0060/add').toPromise()
  //   this.toasts.success("Đã sắp " + k.filter(x => x.code === "OK").length + " xe cho " + this.thistuyentaxi.listdata.length + ' người.', null, { closeButton: true, positionClass: 'toast-bottom-right' })
  //   this.thistuyentaxi.listdata = []
  //   ////console.log(DX0060)
  //   ////console.log(k)
  //   this.showdon()
  // }
  // toast() {
  // }
  async sendmail() {
    let note=`<br>Đây là email tự động, vui lòng không reply. Xin cảm ơn!`
    let body = '<br>' + document.getElementById('ftyuio').innerHTML
    
    this.listdata.map(async xs => {
      xs.map(async xx=>{
        let x:any={}
        Object.keys(xx).forEach(key=>{
          x[key]=xx[key]
        })
        if (x.email == null || x.email == undefined || x.email == '') return
        let checksapca = (x.T008C == null ? "" : x.T008C).indexOf('Form tạo tự động') != -1 ? true : false
        let noidung = `<b>Gửi anh/chị: ` + x.hodem + `</b><br>
        <p>Bộ phận Hành chính nhận được `+ (checksapca ? 'sắp ca' : 'đăng ký') + ` của anh/chị về việc sử dụng taxi làm việc ngoài giờ hành chính. </p>
        <p>Khung giờ về từ công ty: <b>`+ x.tenKhungGio + ', ngày ' + new Date().toLocaleDateString('en-GB') + `</b>.</p>
        <p>Điểm lên taxi: <b>`+ x.tenTuyenXe + `</b>.</p>
        <p>Lịch trình: <b>`+ x.tenTuyenXe + " -> " + [...new Set(xs.map(xd => xd.tenDiemDon))].join("->") + `</b>.</p>
        <p>Người đồng hành: Tham khảo danh sách đính kèm.</p>
        <p>Người duyệt: <b>`+ this.user.displayName + `</b></p>
        <p>Thời gian duyệt: <b>`+ new Date().toLocaleString('fr-ca') + `</b></p>
        <i>Chú ý: GA sẽ từ chối thanh toán chi phí taxi nếu nhân viên không tuân theo sự xắp xếp.</i><br>`
        let data = await this.rest.PostDataToAPI<any>({ to: x.email, subject: '[GA] Danh sách người đi xe taxi', bobdy: (noidung + body+note) }, 'Mail/sendmail').toPromise()
        if (data.code == "OK") {
          let rel = await this.rest.GetDataFromAPI<any>('lamthemgio/isthongbao/' + x.DX0001_ID).toPromise()
          if (rel.code == "OK") {
            x.thongbao = true
            this.toasts.success("Gửi mail thông báo tới " + x.hodem + ' (' + x.manhansu + ')', null, { positionClass: 'toast-bottom-right' })
          }
        }
        ////console.log(data)
      })
    })
  }
    async sapxe(){
  this.sendmail()
    let DX0060 = []
    
    for (let index = 0; index<this.listdata.length; index++) {
      let DX0061 = this.listdata[index]
      let khunggioid = DX0061.length > 0 ? DX0061[0].T007C : null
      let ghichu = (DX0061.length > 0 ? DX0061[0].tenTuyenXe : null) + "->" + [...new Set(DX0061.map(x => x.tenDiemDon))].join("->")
      let arr=await this.rest.PostDataToAPI<any>(ghichu.split('->'),'DX0011/getlatlngwidthtendiem/').toPromise()
      if(arr.length>=2){ 
        //////console.log(arr,'\n')
        DX0061.soKmDuTinh= await this.calc(arr,this.listdata[index])
      }
       
      DX0060.push({ DX0061: DX0061, ghiChu: ghichu, DX0070_ID: khunggioid, soKmDuTinh: DX0061.soKmDuTinh })
    }
    
    let k = await this.rest.PostDataToAPI<any>(DX0060, 'DX0060/add').toPromise()
    this.toasts.success("Đã sắp " + k.filter(x => x.code === "OK").length + " xe", null, { closeButton: true, positionClass: 'toast-bottom-right' })
    //this.thistuyentaxi.listdata = []
    ////console.log(DX0060)
    ////console.log(k)
    this.showdon()
    this.jjjj.emit(false)
    this.issave=true
 }
 redirection=[]
 thistlotring
//  async hhh($event){{
//   ////console.log($event)
//     let sum=0;
//   if($event.routes.length>0){
//     $event.routes[0].legs.map(x=>{
//       sum+=x.distance.value
//     })
//   }
//   ////console.log((sum/1000).toFixed(1))
//   return (sum/1000).toFixed(1)
// }}
async calc(arrs:any[],item){
  return new Promise<any>((resolve, reject) =>{
   ////console.log(arrs)
  let arr:google.maps.LatLng[]=[]
  let arrt:google.maps.DirectionsWaypoint[]=[]
  arrs.map(j=>{
    let k=new google.maps.LatLng(j.lat,j.lng)
    arr.push(k)
    arrt.push({location:k,stopover:false})
  })
  var directionsService = new google.maps.DirectionsService;
  //var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsService.route(
    {
      origin: arr[0],
      destination: arr[arr.length-1],
      waypoints: arrt,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function(response, status) {
      if (status === "OK") {
       if(response.routes.length!=0){
         resolve(+(response.routes[0].legs[0].distance.value/1000).toFixed(1))
       }
        
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
 })
  
}
}
