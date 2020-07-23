import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
@Input()tab
@Input()classs
@Output('tab')tabsend=new EventEmitter<number>()
@Input()listtab:any[]
  constructor() { }

  ngOnInit(): void {
  }
  tabchange(i){
    this.tabsend.emit(i)
  }
}
