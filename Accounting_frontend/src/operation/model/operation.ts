import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/account/model/account';
import { Category } from 'src/category/model/category';
import { EMPTY_GUID } from 'src/const';
import { Contractor } from 'src/contractor/model/contractor';
import { OperationType } from './operation-type';

/**
 * Операция
 */
export interface Operation {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Дата
   */
  date: Date;

  /**
   * Сумма
   */
  sum: number;

  /**
   * Идентификатор счета кредита
   */
  accountID: string;

  /**
   * Счет кредит
   */
  account: Account | null;

  /**
   * Идентификатор категории
   */
  categoryID: string;

  /**
   * Категория
   */
  category: Category | null;

  /**
   * Идентификатор контрагента
   */
  contractorID: string;

  /**
   * Контрагент
   */
  contractor: Contractor | null;

  /**
   * Описание
   */
  description: string;

  /**
   * Тип операции дебет/кредит
   */
  operationType: OperationType;
}

export function operationDefault(): Operation {
  return {
    id: EMPTY_GUID,
    date: new Date(),
    sum: 0,
    accountID: '',
    account: null,
    categoryID: '',
    category: null,
    contractorID: '',
    contractor: null,
    description: '',
    operationType: OperationType.Credited,
  };
}

export function operationFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    accountID: new FormControl<string>(EMPTY_GUID),
    account: new FormControl<Account | null>(null, [Validators.required]),
    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required]),
    contractorID: new FormControl<string>(EMPTY_GUID),
    contractor: new FormControl<Contractor | null>(null, [Validators.required]),
    description: new FormControl<string>(''),
    operationType: new FormControl<OperationType>(OperationType.Credited),
  });
}
