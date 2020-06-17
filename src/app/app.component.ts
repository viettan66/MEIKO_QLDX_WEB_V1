import { Component,OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    $(document).ready(function(){
     
      $(document).on('mousedown',".modal-header", function(mousedownEvt) {
            var $draggable = $(this);
            var x = mousedownEvt.pageX - $draggable.offset().left+20,
                y = mousedownEvt.pageY - $draggable.offset().top+20;
            $("body").on("mousemove.draggable", function(mousemoveEvt) {
                $draggable.closest(".modal-dialog").offset({
                    "left": mousemoveEvt.pageX - x,
                    "top": mousemoveEvt.pageY - y
                });
            });
            $("body").one("mouseup", function() {
                $("body").off("mousemove.draggable");
            });
            $draggable.closest(".modal").one("bs.modal.hide", function() {
                $("body").off("mousemove.draggable");
            })})

    })
  }
}
