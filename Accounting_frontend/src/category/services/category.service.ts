import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

const URL: string = `${environment.url}/api/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private client: HttpClient) {
  }

  public get(id: string = ''): Observable<Category[]> {
    const params = new HttpParams().append("id", id);
    return this.client.get<Category[]>(URL, { params });
  }

  public set(category: Category): Observable<Category> {
    return this.client.post<Category>(URL, category);
  }

  public remove(id: string) {
    const params = new HttpParams().append("id", id);
    return this.client.delete<Category>(URL, { params });
  }
}
