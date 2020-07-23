import { Component, OnInit } from '@angular/core';
import * as Global from '../../Service/global'
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  constructor(public rest:RESTService) { 
    this.imagelink=Global.localimage}

  imagelink=''
  listbaiviet=[]
  async ngOnInit() {
    
  this.listbaiviet= await this.rest.GetDataFromAPI<any[]>('DX0150/getall').toPromise()
  }

}
