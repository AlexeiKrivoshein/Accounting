import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPTY_GUID } from 'src/const';
import { environment } from 'src/environments/environment';
import { Template } from '../model/template';

const URL: string = `${environment.url}/api/template`;

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(private client: HttpClient) {
  }

  public get(id: string = ''): Observable<Template[]> {
    const params = new HttpParams().append("id", id);
    return this.client.get<Template[]>(URL, { params });
  }

  public set(account: Template): Observable<Template> {
    const stored = { ...account };
    stored.defaultCategoryID = stored.defaultCategory?.id ?? EMPTY_GUID;
    stored.defaultCategory = null;

    return this.client.post<Template>(URL, stored);
  }

  public remove(id: string) {
    const params = new HttpParams().append("id", id);
    return this.client.delete<Template>(URL, { params });
  }
}
