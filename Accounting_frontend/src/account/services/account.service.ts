import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Account } from "../model/account";

const URL: string = `${environment.url}/api/account`;

@Injectable({ 
  providedIn: "root" 
})
export class AccountService {
  constructor(private client: HttpClient) {
  }

  public get(id: string = ''): Observable<Account[]> {
    const params = new HttpParams().append("id", id);
    return this.client.get<Account[]>(URL, { params });
  }

  public set(account: Account): Observable<Account> {
    return this.client.post<Account>(URL, account);
  }

  public remove(id: string) {
    const params = new HttpParams().append("id", id);
    return this.client.delete<Account>(URL, { params });
  }
}