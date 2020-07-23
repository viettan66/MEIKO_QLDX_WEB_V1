import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-checkall',
  templateUrl: './item-checkall.component.html',
  styleUrls: ['./item-checkall.component.css']
})
export class ItemCheckallComponent implements OnInit {
@Input()listdata=[]
  constructor() { }

  async ngOnInit() {
  }
  change($event){
    this.listdata.map(x=>{
      x.check=$event.target.checked
    })
  }
}
