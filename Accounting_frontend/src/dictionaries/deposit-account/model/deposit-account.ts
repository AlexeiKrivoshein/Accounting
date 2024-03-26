import {AccountBase, accountDefault} from "../../account/model/account-base";
import {Category} from "../../category/model/category";
import {EMPTY_GUID} from "../../../const";
import {MIN_DATE} from "../../../const/min-date";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountClass} from "../../account/model/account-class";

/**
 * Депозитный счет
 */
export class DepositAccount extends AccountBase {
  /**
   * Идентификатор категории
   */
  public categoryID: string = '';

  /**
   * Категория
   */
  public category: Category | null = null;

  /**
   * Класс/тип операции, заполняется при получении на фронте
   */
  public accountClass: AccountClass = AccountClass.Card;
}

export function depositAccountDefault(): DepositAccount {
  return {
    ...accountDefault(),
    categoryID: '',
    category: null,
    accountClass: AccountClass.Card
  };
}

export function depositAccountFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    name: new FormControl<string>('', [Validators.required]),
    code: new FormControl<string>(''),
    removed: new FormControl<boolean>(false),
    removedDate: new FormControl<Date>(MIN_DATE),

    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required]),
  });
}
