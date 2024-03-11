import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { FilterItemValue } from 'src/operation/filter-panel/model/filter-item-value';
import { FilterPanelItem } from 'src/operation/filter-panel/model/filter-panel-item';
import { OperationClass } from 'src/operation/model/operation-class';
import { TransferOperation } from 'src/operation/transfer-operation/model/transfer-operation';

const URL: string = `${environment.url}/api/transferOperation`;

@Injectable({
  providedIn: 'root',
})
export class TransferOperationService {
  constructor(private client: HttpClient) {}

  public get(
    id: string = '',
    filter: { [key: string]: string } = {}
  ): Observable<TransferOperation[]> {
    let params = new HttpParams().append('id', id).appendAll(filter);

    return this.client.get<TransferOperation[]>(URL, { params }).pipe(
      map((operations) =>
        operations.map((operation) => {
          operation.operationClass = OperationClass.TransferOperation;
          return operation;
        })
      )
    );
  }

  public set(operation: TransferOperation): Observable<TransferOperation> {
    const stored = { ...operation };

    stored.creditAccountID = stored.creditAccount?.id ?? EMPTY_GUID;
    stored.creditAccount = null;

    stored.debitAccountID = stored.debitAccount?.id ?? EMPTY_GUID;
    stored.debitAccount = null;

    return this.client.post<TransferOperation>(URL, stored).pipe(
      map((operation) => {
        operation.operationClass = OperationClass.TransferOperation;
        return operation;
      })
    );
  }

  public remove(id: string) {
    if (!id) {
      return of(null);
    }
    const params = new HttpParams().append('id', id);
    return this.client.delete<TransferOperation>(URL, { params });
  }
}
