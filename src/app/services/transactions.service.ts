import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionInterface } from 'src/interface/models/transaction.model.interface';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService implements OnInit {
  @Output() changeListEvent = new EventEmitter();

  list = new BehaviorSubject<TransactionInterface[]>({} as any);
  listSubject = this.list.asObservable();

  totalCredit = Array<number>();
  totalDebit = Array<number>();
  total: number;
  transactions: TransactionInterface[];

  constructor (private http: HttpClient) {
    this.getJSON().subscribe(data => {
       this.transactions = data.transactions;
       this.list.next(this.transactions);
      })
    }

  ngOnInit() {
    this.list.next(this.transactions);
  }

  /**
   * Get data from JSON
   */
  getJSON(): Observable<any> {
    return this.http.get('./assets/data/transactions.json');
  }

  /**
   * Remove transaction from the list
   * @param index index of the specific transaction
   */
  deleteTransaction(index) {
    const removeIndex = this.transactions
      .map(transaction => {
        return transaction.id;
      }).indexOf(index);

    this.transactions.splice(removeIndex, 1);
    this.changeListEvent.emit(this.transactions);
    this.list.next(this.transactions);
  }
}
