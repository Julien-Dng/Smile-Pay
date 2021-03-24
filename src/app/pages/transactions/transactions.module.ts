import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { NgxPaginationModule } from 'ngx-pagination';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule,
    NgxPaginationModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [TransactionsPage]
})
export class TransactionsPageModule {}
