import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-tesst',
  templateUrl: './tesst.component.html',
  styleUrls: ['./tesst.component.css']
})
export class TesstComponent implements OnInit {
  value=0
  values=0
  Lvalue=0
  Lvalues=0
arr
  constructor(public rest:RESTService) { }

  ngOnInit(): void {

  }
async choose(){{
 let dataa=await this.rest.ChooseFileExcel<any>();
 //console.log(dataa)
 this.arr=dataa
}}
caculate($event){{
  let i=0
  let j=9999
  let fi
  let fj
  let li
  let lj
//   let temp=this.arr.filter(c=>(c.dau===Number($event.target.value)))
//  Promise.all( temp.map(async(x,index)=>{
//     if(index==0)return false
//     if(i<(temp[index].stt-temp[index-1].stt)){
//       i=temp[index].stt-temp[index-1].stt
//       fi=temp[index-1]
//       fj=temp[index]
//     }
//   })).then(g=>{
//     this.value=i+0
//     console.log(fi)
//     console.log(fj)
//   }) 
//   Promise.all( temp.map(async(x,index)=>{
//     if(index==0)return false
//     if(j>(temp[index].stt-temp[index-1].stt)){
//       j=temp[index].stt-temp[index-1].stt
//       li=temp[index-1]
//       lj=temp[index]
//     }
//   })).then(g=>{
//     this.values=j+0
//     console.log(li)
//     console.log(lj)
//   })
  /////////////////////
  let Ltemp=this.arr.filter(c=>(c.duoi===Number($event.target.value)||
  c.s1===Number($event.target.value)||
  c.s2===Number($event.target.value)||
  c.s3===Number($event.target.value)||
  c.s4===Number($event.target.value)||
  c.s5===Number($event.target.value)||
  c.s6===Number($event.target.value)||
  c.s7===Number($event.target.value)||
  c.s8===Number($event.target.value)||
  c.s9===Number($event.target.value)||
  c.s10===Number($event.target.value)||
  c.s11===Number($event.target.value)||
  c.s12===Number($event.target.value)||
  c.s13===Number($event.target.value)||
  c.s14===Number($event.target.value)||
  c.s15===Number($event.target.value)||
  c.s16===Number($event.target.value)||
  c.s17===Number($event.target.value)||
  c.s18===Number($event.target.value)||
  c.s19===Number($event.target.value)||
  c.s20===Number($event.target.value)||
  c.s21==Number($event.target.value)||
  c.s22===Number($event.target.value)||
  c.s23===Number($event.target.value)||
  c.s24===Number($event.target.value)||
  c.s25===Number($event.target.value)||
  c.s26===Number($event.target.value)
  ))
 Promise.all( Ltemp.map(async(x,index)=>{
    if(index==0)return false
    if(i<(Ltemp[index].stt-Ltemp[index-1].stt)){
      i=Ltemp[index].stt-Ltemp[index-1].stt
      fi=Ltemp[index-1]
      fj=Ltemp[index]
    }
  })).then(g=>{
    this.Lvalue=i
    console.log(fi)
    console.log(fj)
  }) 
  Promise.all( Ltemp.map(async(x,index)=>{
    if(index==0)return false
    if(j>(Ltemp[index].stt-Ltemp[index-1].stt)){
      j=Ltemp[index].stt-Ltemp[index-1].stt
      li=Ltemp[index-1]
      lj=Ltemp[index]
    }
  })).then(g=>{
    this.Lvalues=j
    console.log(li)
    console.log(lj)
  })
}}
}
