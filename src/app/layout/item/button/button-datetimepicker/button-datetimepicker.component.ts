import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-button-datetimepicker',
  templateUrl: './button-datetimepicker.component.html',
  styleUrls: ['./button-datetimepicker.component.css']
})
export class ButtonDatetimepickerComponent implements OnInit {

  constructor() { }
@Input() width
@Input() data
@Input() classs
@Input() ids
@Input() format
@Input() timepick
@Input() style
Month=new Date().getMonth()+ 1
Date= new Date().getDate()
Hours=new Date().getHours()
Minute=new Date().getMinutes()
Second=new Date().getSeconds()
public now = new Date().getFullYear() + '-' + (( this.Month)<10?'0':'') +this.Month+ '-' + (( this.Date)<10?'0':'') +this.Date + ' ' + (( this.Hours)<10?'0':'') +this.Hours + ':' + (( this.Minute)<10?'0':'') +this.Minute + ':00' 
public now2 = new Date().getFullYear() + '-' + (( this.Month)<10?'0':'') +this.Month+ '-' + (( this.Date)<10?'0':'') +this.Date 
  
@Output("data") datad=new EventEmitter<string>()
  ngOnInit() {
    let that=this
    $(document).ready(function(){
      send()
      $('#'+that.ids).datetimepicker({onChangeDateTime:send,format:that.format,step:1,timepicker:that.timepick})
      function send(){
          that.datad.emit($('#'+that.ids).val())
        }
    })
    
  }
}
