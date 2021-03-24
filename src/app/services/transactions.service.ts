import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionInterface } from 'src/interface/models/transaction.model.interface';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  @Output() deleteTransactionEvent = new EventEmitter();
  @Output() changeListEvent = new EventEmitter();

  transactions = new BehaviorSubject<TransactionInterface[]>({} as any);
  newList = this.transactions.asObservable();

  indexTransaction: number;
  isDeleted: boolean;

  constructor() {}

  updateTransaction(transactions): void {
    this.transactions.next(transactions)
  }

  // Get index of transaction
  getTransactionIndex(index): void {
    this.isDeleted = true;
    this.indexTransaction = index;
    this.deleteTransactionEvent.emit(index);
    this.changeListEvent.emit(this.isDeleted);
  }
}
