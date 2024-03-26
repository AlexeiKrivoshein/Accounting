import {AccountBase} from "../model/account-base";
import {Observable} from "rxjs";

export interface AccountDataManager<T extends AccountBase> {
  account: T;
  save(): Observable<T>;
}
