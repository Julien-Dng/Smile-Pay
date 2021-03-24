import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    private http: HttpClient,
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.transactionsService.changeListEvent
      .subscribe(list => {
        this.newList = list;

        if (this.newList) {
          this.transactionsService.newList.subscribe(transactions => {
            this.transactions = transactions;
            this.getTotal();

            return;
          })
        }
      }
    );

      this.http.get('./assets/data/transactions.json').subscribe((data: any) => {
      this.transactions = data.transactions;
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
