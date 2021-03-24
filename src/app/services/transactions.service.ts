import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TransactionInterface } from 'src/interface/models/transaction.model.interface';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  @Output() changeListEvent = new EventEmitter();

  list = new Observable<any>();
  listSubject = new Subject<any>();

  idTransaction: string;
  totalCredit = Array<number>();
  totalDebit = Array<number>();
  total: number;
  transactions: TransactionInterface[];

  constructor(
    private http: HttpClient,
    ) {
    this.getJSON().subscribe(data => {
       return this.transactions = data.transactions;
    });
  }

  getJSON(): Observable<any> {
    return this.http.get('./assets/data/transactions.json');
  }

  deleteTransaction(index) {
    const removeIndex = this.transactions
      .map(transaction => {
        return transaction.id;
      }).indexOf(index);

    this.transactions.splice(removeIndex, 1);
    this.changeListEvent.emit(this.transactions);
  }

  // getTotal(): number {
  //   const credits = [];
  //   const debits = [];

  //   const credit = this.transactions.filter(transaction => {
  //     return transaction.type === "crédit";
  //   })

  //   const debit = this.transactions.filter(transaction => {
  //     return transaction.type === "débit";
  //   })

  //   credit.forEach(transaction => {
  //     credits.push(transaction.amount);
  //   })

  //   debit.forEach(transaction => {
  //     debits.push(transaction.amount);
  //   })

  //   const allCreditTotal = credits.reduce((a, b) => +a + +b, 0);
  //   const allDebitTotal = debits.reduce((a, b) => +a + +b, 0);

  //   this.totalCredit = credits.reduce((a, b) => +a + +b, 0).toFixed(2);
  //   this.totalDebit =  debits.reduce((a, b) => +a + +b, 0).toFixed(2);

  //   return this.total = +(allCreditTotal - allDebitTotal).toFixed(2);
  // }
}
