import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Balance } from '../model/balance';

const URL: string = `${environment.url}/api/balance`;

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private client: HttpClient) {}

  public calculate(date: Date): Observable<void> {
    const params = new HttpParams().append('date', date.toISOString());
    return this.client.get<void>(`${URL}/calculate`, { params });
  }

  public check(): Observable<void> {
    return this.client.get<void>(`${URL}/check`);
  }

  public getAll(): Observable<Balance[]> {
    return this.client.get<Balance[]>(`${URL}/getAll`);
  }

  public get(id: string): Observable<Balance[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<Balance[]>(`${URL}/get`, { params });
  }
}
