import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  @Input() index: number
  @Input() transaction: any;

  constructor(
    private modalCtrl: ModalController,
    private transactionsService: TransactionsService,
  ) {}

  /**
   * Close the modal
   */
  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  /**
   * Detele a specific transaction from the list
   */
  deleteTransaction(): void {
    this.transactionsService.deleteTransaction(this.transaction.id);
    this.dismissModal();
  }
}
