import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { Contractor } from '../model/contractor';

const URL: string = `${environment.url}/api/contractor`;

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  constructor(private client: HttpClient) {
  }

  public get(id: string = ''): Observable<Contractor[]> {
    const params = new HttpParams().append("id", id);
    return this.client.get<Contractor[]>(URL, { params });
  }

  public set(contractor: Contractor): Observable<Contractor> {
    const stored = { ...contractor };
    stored.categoryID = stored.category?.id ?? EMPTY_GUID;
    stored.category = null;

    return this.client.post<Contractor>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append("id", id);
    return this.client.delete<Contractor>(URL, { params });
  }
}
