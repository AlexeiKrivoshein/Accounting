import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { OperationClass } from 'src/operation/model/operation-class';
import { CorrectionOperation } from '../model/correction-operation';

const URL: string = `${environment.url}/api/correctionOperation`;

@Injectable({
  providedIn: 'root',
})
export class CorrectionOperationService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<CorrectionOperation[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<CorrectionOperation[]>(URL, { params }).pipe(
      map((operations) =>
        operations.map((operation) => {
          operation.operationClass = OperationClass.CorrectionOperation;
          return operation;
        })
      )
    );
  }

  public set(operation: CorrectionOperation): Observable<CorrectionOperation> {
    const stored = { ...operation };

    stored.accountID = stored.account?.id ?? EMPTY_GUID;
    stored.account = null;

    return this.client.post<CorrectionOperation>(URL, stored).pipe(
      map((operation) => {
        operation.operationClass = OperationClass.CorrectionOperation;
        return operation;
      })
    );
  }

  public remove(id: string) {
    if (!id) {
      return of(null);
    }

    const params = new HttpParams().append('id', id);
    return this.client.delete<CorrectionOperation>(URL, { params });
  }
}
