import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgxPaginationModule} from 'ngx-pagination'
import { IonicStorageModule } from '@ionic/storage-angular';


import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxPaginationModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
