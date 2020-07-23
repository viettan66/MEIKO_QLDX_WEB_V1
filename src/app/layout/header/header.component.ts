
import { Component, OnInit, Injectable } from '@angular/core';
import * as Global from '../../Service/global'
import { RESTService } from 'src/app/Service/rest';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

declare var $:any
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
//@Injectable(),private socket:Socket
export class HeaderComponent implements OnInit {

  constructor(private  rest:RESTService,private  router:Router) { 
    this.user=rest.getUser('loginSO')
    this.HostDangKy=Global.HostDangKy
   // ////console.log(this.user)
  }
  listmenu=[]
  user
  localimage=''
  HostDangKy=''
  load=false
  async ngOnInit() {
    this.listmenu=this.rest.getmenu("QLDX")
    //console.log(this.listmenu)
    // this.socket.emit('fd',"ffffffffffffff")
    // this.socket.on('fd', (dataa) => {
    //   ////console.log(dataa)
    // } )
    this.localimage = Global.localimage;
  }
  showactionuser() {
    if ($("#showkkk").css('width') == '66px')
      $("#showkkk").css('width', '0px')
    else
      $("#showkkk").css('width', '66px')
  }
  changepass(){
    this.pass={}
    $("#f").modal()
  }
  pass:any={}
  async change(){
    this.pass.A0002_ID=this.user.Users_ID
    this.pass.passWord=this.pass.mkmoi
    this.pass.passWordRandom=this.pass.mkcu
    let data=await this.rest.Post<any>(this.pass,'http://192.84.100.207/adminapi/api/User/ChangePassword').toPromise()
    ////console.log(this.pass)
    ////console.log(data)
    if(data.error==0){
      this.rest.Toast_Success("Đổi mật khẩu thành công.","Thông báo")
      $("#f").modal('hide')
    }else{
      this.rest.Toast_Warning(data.ms,"Thông báo")
    }
  }
  logout(){
    this.rest.Toast_Success("Đăng xuất hệ thống...","Thông báo")
    localStorage.removeItem('loginSO')
    setTimeout(() => {
      window.location.reload()
    }, 1000);
    
  }
  te(){
    // this.socket.emit('fd','dfdfdf')
    ////console.log('send')
  }
}
