import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { OperationClass } from 'src/operation/model/operation-class';
import { CashOperation } from '../model/cash-operation';

const URL: string = `${environment.url}/api/cashOperation`;

@Injectable({
  providedIn: 'root',
})
export class CashOperationService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<CashOperation[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<CashOperation[]>(URL, { params }).pipe(
      map((operations) =>
        operations.map((operation) => {
          operation.operationClass = OperationClass.CashOperation;
          return operation;
        })
      )
    );
  }

  public set(operation: CashOperation): Observable<CashOperation> {
    const stored = { ...operation };

    stored.accountID = stored.account?.id ?? EMPTY_GUID;
    stored.account = null;

    return this.client.post<CashOperation>(URL, stored).pipe(
      map((operation) => {
        operation.operationClass = OperationClass.CashOperation;
        return operation;
      })
    );
  }

  public remove(id: string) {
    if (!id) {
      return of(null);
    }

    const params = new HttpParams().append('id', id);
    return this.client.delete<CashOperation>(URL, { params });
  }
}
