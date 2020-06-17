import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule,AgmInfoWindow } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
 import { GoogleMapsModule } from '@angular/google-maps'
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule
} from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsComponent } from './component/maps/maps.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './layout/menu/menu.component';
import { TesstComponent } from './component/tesst/tesst.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { TuyenxeComponent } from './component/tuyenxe/tuyenxe.component';
import { TabComponent } from './layout/item/tab/tab.component';
import { LoadingComponent } from './layout/item/loading/loading.component';
import { DanhsachtuyenxeComponent } from './component/tuyenxe/danhsachtuyenxe/danhsachtuyenxe.component';
import { ThongkenhanvientheotuyenxeComponent } from './component/tuyenxe/danhsachtuyenxe/thongkenhanvientheotuyenxe/thongkenhanvientheotuyenxe.component';
import { DanhsachnhanviendixeComponent } from './component/tuyenxe/danhsachtuyenxe/danhsachnhanviendixe/danhsachnhanviendixe.component';
import { SettingComponent } from './component/setting/setting.component';
import { SettingDiadanhComponent } from './component/setting/setting-diadanh/setting-diadanh.component';
import { ItemCheckallComponent } from './component/item/item-checkall/item-checkall.component';
import { SettingKhungthoigianComponent } from './component/setting/setting-khungthoigian/setting-khungthoigian.component';
import { SettingThetaxiComponent } from './component/setting/setting-thetaxi/setting-thetaxi.component';
import { SettingXebusComponent } from './component/setting/setting-xebus/setting-xebus.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Auth } from './Service/Auth';
import { TuyenxeNhanviendangkyComponent } from './component/tuyenxe/tuyenxe-nhanviendangky/tuyenxe-nhanviendangky.component';
import { TuyenxeNhanvienlamthemgioComponent } from './component/tuyenxe/tuyenxe-nhanvienlamthemgio/tuyenxe-nhanvienlamthemgio.component';
import { TuyenxeNhanviendicongtacComponent } from './component/tuyenxe/tuyenxe-nhanviendicongtac/tuyenxe-nhanviendicongtac.component';
import { SettingDiemtaxiComponent } from './component/setting/setting-diemtaxi/setting-diemtaxi.component';
import { SettingLotrinhtaxiComponent } from './component/setting/setting-lotrinhtaxi/setting-lotrinhtaxi.component';
import { StepComponent } from './layout/item/step/step.component';
import { TuyenxeNhanvienlamthemgioDuyetdonComponent } from './component/tuyenxe/tuyenxe-nhanvienlamthemgio/tuyenxe-nhanvienlamthemgio-duyetdon/tuyenxe-nhanvienlamthemgio-duyetdon.component';
import { TuyenxeNhanvienlamthemgioSapxeComponent } from './component/tuyenxe/tuyenxe-nhanvienlamthemgio/tuyenxe-nhanvienlamthemgio-sapxe/tuyenxe-nhanvienlamthemgio-sapxe.component';
import {ButtonDownloadJsonComponent} from './layout/item/button/button-download-json/button-download-json.component'
import {ButtonDownloadComponent} from './layout/item/button/button-download/button-download.component'
import {ButtonCountComponent} from './layout/item/button/button-count/button-count.component'
import {ButtonNextComponent} from './layout/item/button/button-next/button-next.component'
import {ButtonPreviewComponent} from './layout/item/button/button-preview/button-preview.component';
import { TuyenxeNhanvienlamthemgioChuyenxeComponent } from './component/tuyenxe/tuyenxe-nhanvienlamthemgio/tuyenxe-nhanvienlamthemgio-chuyenxe/tuyenxe-nhanvienlamthemgio-chuyenxe.component';
import { SettingDiadiemComponent } from './component/setting/setting-diadiem/setting-diadiem.component';
import { SettingDiadiemDanhsachComponent } from './component/setting/setting-diadiem/setting-diadiem-danhsach/setting-diadiem-danhsach.component';
import { SettingDiadiemTuyenxeComponent } from './component/setting/setting-diadiem/setting-diadiem-tuyenxe/setting-diadiem-tuyenxe.component';
import { BangsapcaComponent } from './component/bangsapca/bangsapca.component'
import { LichchayxeComponent } from './component/lichchayxe/lichchayxe.component';


const routes: Routes = [
  {path: 'maps', component: MapsComponent},
  {path: '', component: HomeComponent},
  {path: 'HOME', component: HomeComponent,canActivate:[Auth]},
  {path: 'TM', component: LichchayxeComponent,canActivate:[Auth]},
  {path: 'BSC', component: BangsapcaComponent,canActivate:[Auth]},
  {path: 'TUYENXE', component: TuyenxeComponent,canActivate:[Auth]},
  {path: 'SETTING', component: SettingComponent,canActivate:[Auth]},
  {path: 'Login', component: HomeComponent},


  {path: 'tesst', component: TesstComponent,canActivate:[Auth]},

];
@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    TesstComponent,
    HomeComponent,
    TuyenxeComponent,
    TabComponent,
    LoadingComponent,
    DanhsachtuyenxeComponent,
    ThongkenhanvientheotuyenxeComponent,
    DanhsachnhanviendixeComponent,
    SettingComponent,
    SettingDiadanhComponent,
    ItemCheckallComponent,
    SettingKhungthoigianComponent,
    SettingThetaxiComponent,
    SettingXebusComponent,
    TuyenxeNhanviendangkyComponent,
    TuyenxeNhanvienlamthemgioComponent,
    TuyenxeNhanviendicongtacComponent,
    SettingDiemtaxiComponent,
    SettingLotrinhtaxiComponent,
    StepComponent,
    TuyenxeNhanvienlamthemgioDuyetdonComponent,
    TuyenxeNhanvienlamthemgioSapxeComponent,
    ButtonDownloadJsonComponent,
    ButtonDownloadComponent,
    ButtonCountComponent,
    ButtonNextComponent,
    ButtonPreviewComponent,
    TuyenxeNhanvienlamthemgioChuyenxeComponent,
    SettingDiadiemComponent,
    SettingDiadiemDanhsachComponent,
    SettingDiadiemTuyenxeComponent,
    BangsapcaComponent,
    LichchayxeComponent,
  ],
  imports: [ FormsModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
        apiKey: "AIzaSyAhmWLFh_vJSXxxQE_Ypm_F5tdRfqZNCBs",
        libraries: ["places", "geometry"]
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
    AgmDirectionModule,
     GoogleMapsModule,
     [RouterModule.forRoot(routes)],
     HttpClientModule,
     ToastNoAnimationModule.forRoot(),
  ],
  providers: [Auth,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  
  exports: [RouterModule]
})
export class AppModule { }
