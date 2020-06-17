import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  tabchange(i){
    this.tab=i
    this.tabsend.emit(i)
  }
}
