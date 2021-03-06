import { Component,  OnInit } from '@angular/core';

import { TransactionInterface } from 'src/interface/models/transaction.model.interface';

import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.page.html',
  styleUrls: ['./recapitulatif.page.scss'],
})
export class RecapitulatifPage implements OnInit {
  transactions: TransactionInterface[];
  totalCredit = Array<number>();
  totalDebit = Array<number>();
  total: number;

  constructor(
    private transactionsService: TransactionsService,
  ) {}

  ngOnInit(): void {
    this.transactionsService.listSubject.subscribe(data => {
      if (data.length) {
        this.transactionsService.getJSON().subscribe(_ => {
          this.transactions = data;
          this.getTotal();
        });
      }
    });
  }

  /**
   * To get total between credit and debit
   */
  getTotal(): number {
    const credits = [];
    const debits = [];

    const credit = this.transactions.filter(transaction => {
      return transaction.type === "crédit";
    })

    const debit = this.transactions.filter(transaction => {
      return transaction.type === "débit";
    })

    credit.forEach(transaction => {
      credits.push(transaction.amount);
    })

    debit.forEach(transaction => {
      debits.push(transaction.amount);
    })

    const allCreditTotal = credits.reduce((a, b) => +a + +b, 0);
    const allDebitTotal = debits.reduce((a, b) => +a + +b, 0);

    this.totalCredit = credits.reduce((a, b) => +a + +b, 0).toFixed(2);
    this.totalDebit =  debits.reduce((a, b) => +a + +b, 0).toFixed(2);

    return this.total = +(allCreditTotal - allDebitTotal).toFixed(2);
  }
}
