import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsComponent } from './component/maps/maps.component';


const routes: Routes = [
  {path: 'maps', component: MapsComponent},
  {path: '', component: MapsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
