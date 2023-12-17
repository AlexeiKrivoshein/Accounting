import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../model/plan';

const URL: string = `${environment.url}/api/plan`;

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<Plan[]> {
    const params = new HttpParams().append('id', id);
    return this.client.get<Plan[]>(URL, { params });
  }

  public set(plan: Plan): Observable<Plan> {
    const stored = { ...plan };

    stored.spendings = stored.spendings.map((item) => ({
      ...item,
      categoryID: item.category?.id ?? item.categoryID,
      category: null,
      planID: plan.id,
    }));

    stored.savings = stored.savings.map((item) => ({
      ...item,
      accountID: item.account?.id ?? item.accountID,
      account: null,
      planID: plan.id,
    }));

    return this.client.post<Plan>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append('id', id);
    return this.client.delete<Plan>(URL, { params });
  }
}
