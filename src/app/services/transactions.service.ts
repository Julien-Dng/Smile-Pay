import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
  url = './assets/data/transactions.json';

  constructor (
    private http: HttpClient,
    private toastCtrl: ToastController,
    ) {
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
    return this.http.get(this.url);
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

  /**
   * Notice that the transaction has been deleted
   */
  noticeTransactionDeteled(): void {
    this.toastCtrl.create({
        message: `La transaction a été supprimé de la liste`,
        duration: 1000,
        position: 'top',
    }).then((toast) => {
        toast.present();
      })
    ;
  }
}
