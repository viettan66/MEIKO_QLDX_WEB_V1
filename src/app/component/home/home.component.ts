import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest';
import { GoogleCharts } from 'google-charts';
declare var $: any
declare var google: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public rest: RESTService) { }
  countnguoidangky
  counttuyenxe
  countdiemdon
  countxe
  top10nhanviensudungtaxi = []
  top10nhanviensudungcongtac = []
  getchiphisdtaxitrongthang: any
  GetThongKeTaxi: any
  getKMxecongtactrongnam: any
  async ngOnInit() {
    let that = this
    this.countnguoidangky = await this.rest.GetDataFromAPI<any>("thongke/getcountnhanviendangky").toPromise()
    this.counttuyenxe = await this.rest.GetDataFromAPI<any>("thongke/GetCountTuyenXe").toPromise()
    this.countdiemdon = await this.rest.GetDataFromAPI<any>("thongke/GetCountDiemDon").toPromise()
    this.countxe = await this.rest.GetDataFromAPI<any>("thongke/GetCountXe").toPromise()
    this.top10nhanviensudungtaxi = await this.rest.GetDataFromAPI<any>("thongke/Gettop10nhanviensudungtaxi").toPromise()
    this.top10nhanviensudungcongtac = await this.rest.GetDataFromAPI<any>("thongke/Top10NhanVienCongTac").toPromise()
    this.GetThongKeTaxi = await this.rest.GetDataFromAPI<any>("thongke/GetThongKeTaxi").toPromise()
    this.getchiphisdtaxitrongthang = await this.rest.GetDataFromAPI<any>("thongke/getluotsdtaxitrongthang2").toPromise()
    this.getKMxecongtactrongnam = await this.rest.GetDataFromAPI<any>("thongke/getKMxecongtactrongnam").toPromise()
    
    ////console.log(this.getKMxecongtactrongnam)
    let datatable1 = [['Tuần của tháng ' + (new Date().getMonth() + 1), 'Lượt']]
    for (let index = 1; index <= 5; index++) {
      datatable1.push([index < 10 ? ('0' + index) : (index + ''), this.getchiphisdtaxitrongthang['w' + index]])
    }
    let datatable2 = [['Tuần của tháng ' + (new Date().getMonth() + 1), 'Chi phí']]
    for (let index = 1; index <= 5; index++) {
      datatable2.push([index < 10 ? ('0' + index) : (index + ''), this.getchiphisdtaxitrongthang['w' + index + '' + index]])
    }
    google.charts.load('current', { 'packages': ['bar', "corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(datatable1);
      var data2 = google.visualization.arrayToDataTable(datatable2);
      var options = {
        legend: { position: 'none' },
        chart: {
          title: '',
          subtitle: '',
        }
      };
      var chart = new google.charts.Bar(document.getElementById('curve_chart0'));
      chart.draw(data, google.charts.Bar.convertOptions(options));
      var chart2 = new google.charts.Bar(document.getElementById('curve_chart1'));
      chart2.draw(data2, google.charts.Bar.convertOptions(options));
    }
    let datatabel3 = [['Tháng', 'Tổng KM']]
    if (this.getKMxecongtactrongnam != null) {
      for (let index = 1; index <= 12; index++) {
        datatabel3.push(['' + index, this.getKMxecongtactrongnam['m' + index]])
      }
    }
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
      var data2 = google.visualization.arrayToDataTable(datatabel3);
      var options2 = {
        legend: { position: 'bottom' },
        chartArea: { width: '100%' },
        curveType: 'function',
      };
      var chart = new google.visualization.LineChart(document.getElementById('curve_chart2'));
      chart.draw(data2, google.charts.Bar.convertOptions(options2));
    }
    google.charts.setOnLoadCallback(drawChart3);
    function drawChart3() {
      var data = google.visualization.arrayToDataTable([
        ['', ''],
        ['Reject', that.GetThongKeTaxi.reject],
        ['Waiting', that.GetThongKeTaxi.waiting],
        ['Pending', that.GetThongKeTaxi.pending],
        ['Complete', that.GetThongKeTaxi.complete],
      ]);
      var options = {
        title: 'My Daily Activities',
        pieHole: 0.4,
        chartArea: { height: '100%', width: '100%' },
      };
      var chart = new google.visualization.PieChart(document.getElementById('curve_chart3'));
      chart.draw(data, options);
    }
  }
}
