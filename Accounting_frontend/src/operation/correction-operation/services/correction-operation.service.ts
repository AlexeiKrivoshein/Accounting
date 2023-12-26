import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { CorrectionOperation } from '../model/correction-operation';

const URL: string = `${environment.url}/api/correction`;

@Injectable({
  providedIn: 'root',
})
export class CorrectionOperationService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<CorrectionOperation[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<CorrectionOperation[]>(URL, { params });
  }

  public set(correction: CorrectionOperation): Observable<CorrectionOperation> {
    const stored = { ...correction };

    stored.accountID = stored.account?.id ?? EMPTY_GUID;
    stored.account = null;

    return this.client.post<CorrectionOperation>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append('id', id);
    return this.client.delete<CorrectionOperation>(URL, { params });
  }
}
