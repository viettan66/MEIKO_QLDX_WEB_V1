import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { AgmGeocoder } from '@agm/core';
declare var $:any
@Component({
  selector: 'app-lichchayxe',
  templateUrl: './lichchayxe.component.html',
  styleUrls: ['./lichchayxe.component.css']
})
export class LichchayxeComponent implements OnInit {

  constructor(public rest:RESTService) { }
listdata=[]
diemdon=[]
tab=0
showdiem=true
lat: number = 21.027057;
lng: number =  105.755508;
zoom: number = 12;
 async ngOnInit() {
  this.show()
  }
async show(){
 this.listdata=await this.rest.PostDataToAPI<any[]>({type:this.tab+1},'dx0010/getalls').toPromise()
   ////console.log(this.listdata)
}
  start=0
  step=30
  getstart($event){
this.start=$event
  }
  getstep($event){

    this.step = $event
  }
  item
  item2
  async showtuyenduong(x, item2) {
    this.item = x
    this.item2 = item2
    this.thistuyenduong=x
    this.thistuyenduong.waypoints=(x.DX0010D==null||x.DX0010D.length<3)?null: x.DX0010D.slice(1,x.DX0010D.length-1).map(x=>{return {location: { lat: x.DX0011.lat, lng: x.DX0011.lng }}})
    ////console.log(this.thistuyenduong)
    //this.calcu=this.calculateDistance(this.thistuyenduong.DX0010D[0].DX0011,this.thistuyenduong.DX0010D[this.thistuyenduong.DX0010D.length-1].DX0011)
  
    this.xemdiem()
    ////console.log(x)
    $('#my-modal').modal()

  }
  xemtuyen() {
    this.showdiem=false
    this.diemdon = []
    this.item.DX0010D.map(x => {
      this.diemdon.push(x.DX0011)
    })
  }
  xemdiem() {
      this.lat = this.item2.lat
      this.lng = this.item2.lng
    this.showdiem=true
    this.diemdon = []
    if (this.showdiem) {
      this.diemdon.push(this.item2)
    }


  }
  calcu
  thistuyenduong
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
  public renderOptions = {
    suppressMarkers: true,
}
getaddress(lat,lng){

}
}
