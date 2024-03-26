import {Injectable} from "@angular/core";
import {AccountDataManager} from "../../account/data-manager/account-data-manager";
import {DepositAccount, depositAccountFormGroup} from "../model/deposit-account";
import {FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";
import {DepositAccountService} from "../services/deposit-account-service";
import {AccountClass} from "../../account/model/account-class";

@Injectable()
export class DepositAccountDataManager
  implements AccountDataManager<DepositAccount> {

  public set account(value: DepositAccount) {
    this.formGroup.setValue(value);
  }

  public get account(): DepositAccount {
    return this.formGroup.value as DepositAccount;
  }

  public formGroup: FormGroup = depositAccountFormGroup();

  constructor(
    private _depositAccountService: DepositAccountService
  ) {
  }

  public save(): Observable<DepositAccount> {
    return this._depositAccountService.set(this.account).pipe(
      map((account) => {
        this.account = {
          ...account,
          accountClass: AccountClass.DepositAccount
        };

        return this.account;
      })
    )
  }
}
