import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { Correction } from '../model/correction';

const URL: string = `${environment.url}/api/correction`;

@Injectable({
  providedIn: 'root',
})
export class CorrectionService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<Correction[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<Correction[]>(URL, { params });
  }

  public set(correction: Correction): Observable<Correction> {
    const stored = { ...correction };

    stored.accountID = stored.account?.id ?? EMPTY_GUID;
    stored.account = null;

    return this.client.post<Correction>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append('id', id);
    return this.client.delete<Correction>(URL, { params });
  }
}
