import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/account/model/account';
import { Category } from 'src/category/model/category';
import { EMPTY_GUID } from 'src/const';
import { Contractor } from 'src/contractor/model/contractor';
import { Movement, movementDefault } from './movement';
import { MovementType } from './movement-type';
import { OperationType } from './operation-type';

/**
 * Операция с контрагентом
 */
export interface Operation extends Movement {
  /**
   * Идентификатор счета кредита
   */
  accountID: string;

  /**
   * Счет кредит
   */
  account: Account | null;

  /**
   * Идентификатор контрагента
   */
  contractorID: string;

  /**
   * Контрагент
   */
  contractor: Contractor | null;

  /**
   * Идентификатор категории
   */
  categoryID: string;

  /**
   * Категория
   */
  category: Category | null;

  /**
   * Тип операции дебет/кредит
   */
  operationType: OperationType;
}

export function operationDefault(): Operation {
  return {
    ...movementDefault(),
    accountID: '',
    account: null,
    contractorID: '',
    contractor: null,
    categoryID: '',
    category: null,
    operationType: OperationType.Credited,
  };
}

export function operationFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    accountID: new FormControl<string>(EMPTY_GUID),
    account: new FormControl<Account | null>(null, [Validators.required]),
    contractorID: new FormControl<string>(EMPTY_GUID),
    contractor: new FormControl<Contractor | null>(null, [Validators.required]),
    categoryID: new FormControl<string>(EMPTY_GUID),
    category: new FormControl<Category | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Credited),
  });
}
