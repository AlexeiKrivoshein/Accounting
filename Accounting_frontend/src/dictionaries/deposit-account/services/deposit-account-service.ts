import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {DepositAccount} from "../model/deposit-account";
import {environment} from "../../../environments/environment";
import {AccountClass} from "../../account/model/account-class";
import {EMPTY_GUID} from "../../../const";

const URL: string = `${environment.url}/api/depositAccount`;

@Injectable({
  providedIn: 'root',
})
export class DepositAccountService {
  constructor(private client: HttpClient) {}

  public get(id: string = ''): Observable<DepositAccount[]> {
    let params = new HttpParams().append('id', id);

    return this.client.get<DepositAccount[]>(URL, { params }).pipe(
      map((accounts) =>
        accounts.map((account) => {
          account.accountClass = AccountClass.DepositAccount;
          return account;
        })
      )
    );
  }

  public set(account: DepositAccount): Observable<DepositAccount> {
    const stored = { ...account };

    stored.categoryID = stored.category?.id ?? EMPTY_GUID;
    stored.category = null;

    return this.client.post<DepositAccount>(URL, stored).pipe(
      map((DepositAccount) => {
        DepositAccount.accountClass = AccountClass.DepositAccount;
        return DepositAccount;
      })
    );
  }

  public remove(id: string) {
    if (!id) {
      return of(null);
    }

    const params = new HttpParams().append('id', id);
    return this.client.delete<DepositAccount>(URL, { params });
  }
}
