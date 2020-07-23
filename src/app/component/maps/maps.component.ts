import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  constructor(public rest:RESTService){}
  public renderOptions = {
    suppressMarkers: true,
}
  location: Location
  zoom: number = 12;
  color=['#FF0000','#FBFF00','#36FF00','#00F7FF','#7800FF','#D500FF','#FF009E','#000000','#157D00']
  lat: number = 21.027057;
  lng: number =  105.755508;
  origin: any;
  destination: any;
  waypoints = [ ];
  diemdon=[]
  tuyenduong=[]
  thistuyenduong=null
  direction=[]
  async ngOnInit() {
    this.diemdon=await this.rest.GetDataFromAPI<any>("DX0011/getall/all").toPromise()
    this.tuyenduong=await this.rest.GetDataFromAPI<any>("DX0010/getall/all").toPromise()
    ////console.log(this.diemdon)
    // this.diemdon.map((x,index)=>{
    //   this.direction.push({
    //     origin:x.DX0011[0],
    //     destination:x.DX0011[x.DX0011.length-1],
    //    waypoints:x.DX0011.length<2?null: x.DX0011.slice(1, x.DX0011.length-1).map(ff=>{
    //      return {location:{lat:ff.lat,lng:ff.lng,
    //       label: 'string'}}
    //    }),
    //    option:{ 
    //       origin: {
    //         //icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
    //         //draggable: true,
    //       },
    //       destination: {
    //         //  icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756626_face_512x512.png',
    //        // label: 'MARKER LABEL',
    //         opacity: 0.8,
    //       },},
    //     renderOptions: { polylineOptions: { strokeColor: this.color[index] } }
    //   })
    //   ////console.log(this.direction)
    // })
  }
  clickedMarker(label: string, index: number) {
    ////console.log(`clicked the marker: ${label || index}`)
  }
  markerDragEnd(m: marker, $event) {
    m.lat = $event.coords.lat
    m.lng = $event.coords.lng
    ////console.log('lat:'+ m.lat+' - lng:'+m.lng)
  }
  mapClicked($event) {return false
    // this.waypoints=[]
    if(!confirm(`Bạn có muốn tạo thêm điểm trên bản đồ không?`)){
      return false
    }
    ////console.log($event)
    this.diemdon.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      label: 'Điểm mới ' + (this.markers.length + 1),
    });
    // this.origin = this.markers[0]
    // this.destination = this.markers[this.markers.length-1]
    // for(let i=1;i<this.markers.length-1;i++)
    //   this.waypoints.push({location: { lat: this.markers[i].lat, lng: this.markers[i].lng }})
    // ////console.log(this.calculateDistance(this.origin, this.destination))
  }
  markers: marker[] = [
    {
      lat: 21.007798667243172,
      lng: 105.62778841372531,
      label: 'A',
      draggable: true
    }
  ]
  calculateDistance(point1, point2) {
    const p1 = new google.maps.LatLng(
      point1.lat,
      point1.lng
    );
    const p2 = new google.maps.LatLng(
      point2.lat,
      point2.lng
    );
    return (
      google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
    ).toFixed(2);
  }
  calculateDistance2(kkk) {
    let arr=[]
    kkk.map(x=>{
      arr.push(new google.maps.LatLng(
      x.lat,
      x.lng
    ))
    })
    
    return (
      google.maps.geometry.spherical.computeLength(arr) / 1000
    ).toFixed(2);
  }
  async themdiemdon(){
    let dataa=await this.rest.PostDataToAPI<any[]>(this.diemdon,'DX0011/Update').toPromise()
    ////console.log(dataa)
  }
  point
    getCenter($event){
this.point=$event
    }
    ready($event){
      //////console.log($event)
    }
  async adddiemdon(){
    if(this.point==null){
      alert('Di chuyển bản đồ trước khi tạo điểm')
      return false
    }
    this.diemdon.push({
      lat: this.point.lat,
      lng: this.point.lng,
      draggable: true,
      label: 'Điểm mới ' + (this.markers.length + 1),
    });
  }
  async removediemdon(m){
    if(!confirm('Bạn có chắc chắc chắn muốn xóa điểm đón "'+m.tenDiemDon+'" không?'))return false
 let dataa=await this.rest.PostDataToAPI<any[]>(m,'DX0011/Delete').toPromise()
 this.diemdon=this.diemdon.filter(c=> c !== m)
    ////console.log(dataa)
  }
  calcu='0'
  thaydoituyenduong($event){
    this.thistuyenduong=null
  this.calcu='0'
    ////console.log(this.tuyenduong.filter(c=>c.DX0010_ID===$event.target.value))
    this.tuyenduong.filter(c=>c.DX0010_ID===$event.target.value).map(x=>{
      this.thistuyenduong=x
      this.thistuyenduong.waypoints=(x.DX0010D==null||x.DX0010D.length<3)?null: x.DX0010D.slice(1,x.DX0010D.length-1).map(x=>{return {location: { lat: x.DX0011.lat, lng: x.DX0011.lng }}})
      ////console.log(this.thistuyenduong)
      ///////////////////////////////
      let tendiem=this.thistuyenduong.DX0010D.map(b=>{
        return {lat:b.DX0011.lat,lng:b.DX0011.lng}
        })
        ////console.log(tendiem)
        let kkk=this.calculateDistance2(tendiem)
        ////console.log(kkk)
    })
  }
  edittuyenduong=false
  async sualotrinhtuyenduong(){
    if(this.thistuyenduong==null){
      alert('Hãy chọn tuyến đường trước khi sửa!')
      return false
    }
    this.edittuyenduong=!this.edittuyenduong
      ////console.log(this.thistuyenduong)
    if(!this.edittuyenduong){
      let data=await this.rest.PostDataToAPI<any[]>(this.thistuyenduong.DX0010D,'DX0010D/add').toPromise()
      ////console.log(data)
    }
  }
  themmoidiemchotuyenduong(){
    this.thistuyenduong.DX0010D.push({DX0010_ID:this.thistuyenduong.DX0010_ID,DX0011_ID:'',DX0011:{lat:  21.027057,lng:105.755508}})
  }
  async xoabodiemchotuyenduong(element){
    let data=await this.rest.PostDataToAPI<any>(element,'DX0010D/delete').toPromise()
    ////console.log(data)
    this.thistuyenduong.DX0010D.splice(this.thistuyenduong.DX0010D.indexOf(element),1)
  }
  chondiemdonchotuyenduong($event,element){

this.diemdon.filter(c=>c.DX0011_ID===$event.target.value).map(x=>{element.DX0011=x})
  }
  newtuyenduong={maTuyenXe:null,tenTuyenXe:null,ghiChu:null,trangThai:true,type:1}
  themtuyenduong(){
    $('#themtuyenduongmodal').modal()
  }
  async xoatuyenduong(){
    if(!confirm('Bạn có chắc chắc chắn muốn xóa tuyến đường "'+this.thistuyenduong.tenTuyenXe+'" không?'))return false
    let data=await this.rest.PostDataToAPI<any[]>([this.thistuyenduong],"DX0010/delete").toPromise()
    ////console.log(data)
  data.filter(c=>c.code==="OK").map(x=>{
    this.tuyenduong=this.tuyenduong.filter(c=>!c===this.thistuyenduong)
    this.thistuyenduong=null
  })

  }
  async luutuyenduongmoi(){
    let data=await this.rest.PostDataToAPI<any[]>([this.newtuyenduong],"DX0010/add").toPromise()
    data.filter(c=>c.code==="OK").map(x=>{
      this.tuyenduong.push(x.data)
      $('#themtuyenduongmodal').modal('hide')
    })
  }
  showthutu(element){{
    ////console.log(element.thuTu)
  }}
  hhh($event){{
    ////console.log($event)
      let sum=0;
    if($event.routes.length>0){
      $event.routes[0].legs.map(x=>{
        sum+=x.distance.value
      })
    }
    ////console.log((sum/1000).toFixed(1))
    this.calcu=(sum/1000).toFixed(1)
  }}
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}