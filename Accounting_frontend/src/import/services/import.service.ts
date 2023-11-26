import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movement } from 'src/movement/model/movement';

const URL: string = `${environment.url}/api/import`;

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  constructor(private client: HttpClient) {}

  public parse(content: string): Observable<Movement[]> {
    return this.client.post<Movement[]>(`${URL}/parse`, {
      content
    });
  }
}
