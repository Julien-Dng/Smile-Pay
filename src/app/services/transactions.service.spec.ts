import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TransactionInterface } from '../../interface/models/transaction.model.interface'

import { TransactionsService } from './transactions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TransactionsService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TransactionsService);
  });

  describe('get transactions', () => {
    let expectedTransactions: TransactionInterface[];

    beforeEach(() => {
      service = TestBed.inject(TransactionsService);
      expectedTransactions = [
    		{
          id: "4",
          datetime: "2020-05-05T15:45:08.000+02:00",
          amount: "1244.53",
          type: "crédit",
          mode: "",
          commentaire: "contient deux commandes"
        },
        {
          id: "5",
          datetime: "2020-04-08T14:20:58.000+02:00",
          amount: "44.37",
          type: "crédit",
          mode: "VAD",
          commentaire: ""
        },
       ] as TransactionInterface[];
    });

    it('should return expected transactions', () => {
      service.getJSON().subscribe(
        data => expect(data.transactions).toEqual(expectedTransactions),
      );
      const req = httpTestingController.expectOne(service.url);
      expect(req).toBeDefined();
      expect(req.request.method).toEqual('GET');
      req.flush(expectedTransactions);
      httpTestingController.verify();
    });
  });
});


describe('delete item from list', () => {
  let service = TestBed.inject(TransactionsService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TransactionsService ]
    });

    service = TestBed.inject(TransactionsService);
  });

  it('addJob should add the job string to jobs array', () => {
    const expectedTransactions = [
      {
        id: "4",
        datetime: "2020-05-05T15:45:08.000+02:00",
        amount: "1244.53",
        type: "crédit",
        mode: "",
        commentaire: "contient deux commandes"
      },
      {
        id: "5",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "44.37",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      },
      {
        id: "6",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "44.37",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      },
    ] as TransactionInterface[];

    const distinctTransactions = service.deleteTransaction(expectedTransactions[0].id);

    expect(distinctTransactions).toEqual([
      {
        id: "5",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "44.37",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      },
      {
        id: "6",
        datetime: "2020-04-08T14:20:58.000+02:00",
        amount: "44.37",
        type: "crédit",
        mode: "VAD",
        commentaire: ""
      }]
    );
  });
});


