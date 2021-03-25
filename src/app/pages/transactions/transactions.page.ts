import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSelect } from '@ionic/angular';

import { TransactionInterface } from 'src/interface/models/transaction.model.interface';

import { DetailsPage } from './../details/details.page';

import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild('select') selectRef: IonSelect;

  choice: string;
  transaction: number;
  transactions: TransactionInterface[];

  constructor(
    private modalController: ModalController,
    private transactionsService: TransactionsService,
    ) {}

  ngOnInit() {
    this.transactionsService.listSubject.subscribe(data => {
      if (data.length) {
        this.transactionsService.getJSON().subscribe(_ => {
          this.transactions = data;
        });
      }
    });

    this.transactionsService.changeListEvent.subscribe(_ => {
      this.transactionsService.noticeTransactionDeteled();
    })
  }

  /**
   * Sort transaction
   */
  sortTransaction(): void {
    switch (this.choice) {
      case 'date':
        this.transactions.sort((a, b) => {
          const first = a.datetime;
          const last = b.datetime;

          return first > last ? 1 : first < last ? -1 : 0;
        });
        break;
      case 'mode':
        this.transactions.sort((a, b) => {
          const first = a.mode;
          const last = b.mode;

          return first > last ? 1 : first < last ? -1 : 0;
        });
        break;
      case 'type':
        this.transactions.sort((a, b) => {
          const first = a.type;
          const last = b.type;

          return first > last ? 1 : first < last ? -1 : 0;
        });
        break;
      case 'amount':
        this.transactions.sort((a, b) => {
          const first = +a.amount;
          const last = +b.amount;

          return first > last ? 1 : first < last ? -1 : 0;
        });
      break;
    }
  }

  /**
   * Open select list to sort
   */
  openSelect() {
    this.selectRef.open();
  }

  /**
   * Open modal to show transaction details
   */
  async openModal(transaction: any, index: number) {
    let detailsPage = await this.modalController.create({
      component: DetailsPage,
      componentProps: {transaction: transaction, index}
    });

    await detailsPage.present();
  }
}
