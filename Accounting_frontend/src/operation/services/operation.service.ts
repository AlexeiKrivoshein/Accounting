import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { Operation } from '../model/operation';

const URL: string = `${environment.url}/api/operation`;

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<Operation[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<Operation[]>(URL, { params });
  }

  public set(operation: Operation): Observable<Operation> {
    const stored = { ...operation };

    stored.accountID = stored.account?.id ?? EMPTY_GUID;
    stored.account = null;

    stored.categoryID = stored.category?.id ?? EMPTY_GUID;
    stored.category = null;

    stored.contractorID = stored.contractor?.id ?? EMPTY_GUID;
    stored.contractor = null;

    return this.client.post<Operation>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append('id', id);
    return this.client.delete<Operation>(URL, { params });
  }
}
