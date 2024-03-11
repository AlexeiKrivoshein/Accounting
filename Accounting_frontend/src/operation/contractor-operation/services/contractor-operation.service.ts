import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { FilterItemValue } from 'src/operation/filter-panel/model/filter-item-value';
import { OperationClass } from 'src/operation/model/operation-class';
import { ContractorOperation } from '../model/contractor-operation';

const URL: string = `${environment.url}/api/contractorOperation`;

@Injectable({
  providedIn: 'root',
})
export class ContractorOperationService {
  constructor(private client: HttpClient) {}

  public get(
    id: string = '',
    filter: { [key: string]: string } = {}
  ): Observable<ContractorOperation[]> {
    let params = new HttpParams().append('id', id).appendAll(filter);

    return this.client.get<ContractorOperation[]>(URL, { params }).pipe(
      map((operations) =>
        operations.map((operation) => {
          operation.operationClass = OperationClass.ContractorOperation;
          return operation;
        })
      )
    );
  }

  public set(operation: ContractorOperation): Observable<ContractorOperation> {
    const stored = { ...operation };

    stored.accountID = stored.account?.id ?? EMPTY_GUID;
    stored.account = null;

    stored.categoryID = stored.category?.id ?? EMPTY_GUID;
    stored.category = null;

    stored.contractorID = stored.contractor?.id ?? EMPTY_GUID;
    stored.contractor = null;

    return this.client.post<ContractorOperation>(URL, stored).pipe(
      map((operation) => {
        operation.operationClass = OperationClass.ContractorOperation;
        return operation;
      })
    );
  }

  public remove(id: string) {
    if (!id) {
      return of(null);
    }

    const params = new HttpParams().append('id', id);
    return this.client.delete<ContractorOperation>(URL, { params });
  }
}
