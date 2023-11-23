import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { Transfer } from '../../transfer/model/transfer';

const URL: string = `${environment.url}/api/transfer`;

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<Transfer[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<Transfer[]>(URL, { params });
  }

  public set(transfer: Transfer): Observable<Transfer> {
    const stored = { ...transfer };
    
    stored.creditAccountID = stored.creditAccount?.id ?? EMPTY_GUID;
    stored.creditAccount = null;

    stored.debitAccountID = stored.debitAccount?.id ?? EMPTY_GUID;
    stored.debitAccount = null;

    return this.client.post<Transfer>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append('id', id);
    return this.client.delete<Transfer>(URL, { params });
  }
}
