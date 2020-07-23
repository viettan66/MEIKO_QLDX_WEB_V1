import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-dangkyxe',
  templateUrl: './dangkyxe.component.html',
  styleUrls: ['./dangkyxe.component.css']
})
export class DangkyxeComponent implements OnInit {

  constructor() {
   }
loading=true
  ngOnInit() {
  }
  finish(){
    ////console.log('end')
    this.loading=false
    $('#frame').contents().find(".navbar-top").css( "display",'none' )
    //////console.log($('#frame').contents().find("a[title='Thêm mới']"))
    //$("a[title='Thêm mới']").css("color", "yellow")
  }
}
