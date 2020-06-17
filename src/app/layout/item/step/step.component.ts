import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input()tab
  @Input()classs
  @Output('tab')tabsend=new EventEmitter<number>()
  @Input()listtab:any[]
    constructor() { }
  
    ngOnInit(): void {
    }
    tabchange(i){
      this.tab=i
      this.tabsend.emit(i)
    }
}
