import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
declare var $:any
@Component({
  selector: 'app-tuyenxe-nhanvienlamthemgio',
  templateUrl: './tuyenxe-nhanvienlamthemgio.component.html',
  styleUrls: ['./tuyenxe-nhanvienlamthemgio.component.css']
})
export class TuyenxeNhanvienlamthemgioComponent implements OnInit {

  constructor() { }

  listtab=[{label:"Duyệt đơn",classs:'fad fa-check'}
          ,{label:'Sắp xe',classs:'fad fa-random'}
          ,{label:'Chuyến xe taxi',classs:'fad fa-chart-network'}
        ]
  tab=0;
  gettab($event){
    this.tab=$event
  }
  ngOnInit(): void {
  }
}