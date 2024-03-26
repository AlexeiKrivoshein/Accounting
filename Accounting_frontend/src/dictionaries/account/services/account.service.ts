import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccountBase } from "../model/account-base";

const URL: string = `${environment.url}/api/account`;

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(private client: HttpClient) {
  }

  public get(id: string = ''): Observable<AccountBase[]> {
    const params = new HttpParams().append("id", id);
    return this.client.get<AccountBase[]>(URL, { params });
  }

  public set(account: AccountBase): Observable<AccountBase> {
    return this.client.post<AccountBase>(URL, account);
  }

  public remove(id: string) {
    const params = new HttpParams().append("id", id);
    return this.client.delete<AccountBase>(URL, { params });
  }
}
