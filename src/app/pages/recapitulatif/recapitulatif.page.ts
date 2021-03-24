import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransactionInterface } from 'src/interface/models/transaction.model.interface';

import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.page.html',
  styleUrls: ['./recapitulatif.page.scss'],
})
export class RecapitulatifPage implements OnInit {
  newList: boolean;
  subscription: Subscription;
  transactions: TransactionInterface[];
  totalCredit = Array<number>();
  totalDebit = Array<number>();
  total: number;

  constructor(
    private transactionsService: TransactionsService,
  ) {
    // this.transactionsService.getJSON().subscribe(data => {
    //   this.transactions = data.transactions;
    //   console.log('initail',this.transactions)
    //   this.getTotal();

    // });
  }

  ngOnInit(): void {
      this.transactionsService.getJSON().subscribe(data => {
      this.transactions = data.transactions;
      console.log('initail',this.transactions)
      this.getTotal();

    });

    this.transactionsService.list.subscribe(transactions => {
      this.transactions = transactions;
      console.log('update', this.transactions);
      this.getTotal();
    });
  }

  // To get total of credit and debit
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
