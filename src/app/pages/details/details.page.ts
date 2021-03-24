import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionsService } from 'src/app/services/transactions.service';

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

  // Close Modal
  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

  // Detele the specific transaction
  deleteTransaction(): void {
    this.transactionsService.getTransactionIndex(this.index);
    this.dismissModal();
  }
}
