import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-danhsachtuyenxe',
  templateUrl: './danhsachtuyenxe.component.html',
  styleUrls: ['./danhsachtuyenxe.component.css']
})
export class DanhsachtuyenxeComponent implements OnInit {

  constructor() { }

  listtab=[{label:"Thông kê từng điểm",classs:'fad fa-route'},{label:'Nhân viên đi xe',classs:'fad fa-shuttle-van'}]
  tab=0;
  gettab($event){
    this.tab=$event
  }
  ngOnInit(): void {
  }

}
