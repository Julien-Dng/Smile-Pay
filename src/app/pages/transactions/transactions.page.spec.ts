import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionsPage } from './transactions.page';

describe('TransactionsPage', () => {
  let component: TransactionsPage;
  let fixture: ComponentFixture<TransactionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('sort array', () => {
    component.transactions = [
      {
        id: "4",
        datetime: "2020-05-05T15:45:08.000+02:00",
        amount: "10",
        type: "crédit",
        mode: "",
        commentaire: "contient deux commandes"
      },
      {
        id: "5",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "30",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      },
      {
        id: "6",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "20",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      },
    ];

    let newArray = [
      {
        id: "4",
        datetime: "2020-05-05T15:45:08.000+02:00",
        amount: "10",
        type: "crédit",
        mode: "",
        commentaire: "contient deux commandes"
      },
      {
        id: "6",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "30",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      },
      {
        id: "5",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "20",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      }
    ];

    component.choice = "amount";
    let sort = component.sortTransaction();

    expect(sort).toBe(newArray);
  });
});
