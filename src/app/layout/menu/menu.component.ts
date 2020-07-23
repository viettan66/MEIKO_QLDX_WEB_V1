import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
@Input()icon
@Input()div_bg
@Input()ul_bg
@Input()li_bg
@Input()li_active_bg
@Input()listmenu
@Input()tab
@Output('tab')tabsend=new EventEmitter<number>()
  constructor(public router:Router) { }
url
showmenu=true
  ngOnInit() {
    this.url=this.router.url
    if(localStorage.getItem("Showmenu")==null)localStorage.setItem('Showmenu','true')
    this.showmenu=JSON.parse(localStorage.getItem("Showmenu"))
  }
  menu(f:boolean){
    //console.log(f)
    this.showmenu=f
    localStorage.setItem("Showmenu",String(f))
  }
  // tabchange(i){
  //   this.tab=i
  //   this.tabsend.emit(i)
  // }
}
