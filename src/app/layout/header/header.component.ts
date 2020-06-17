import { Component, OnInit } from '@angular/core';
import * as Global from '../../Service/global'
import { RESTService } from 'src/app/Service/rest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public rest:RESTService) { 
    this.user=rest.getUser('loginSO')
   // console.log(this.user)
  }
  user
  localimage=''
  ngOnInit(): void {
    
    this.localimage = Global.localimage;
  }

}
