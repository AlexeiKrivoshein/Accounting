import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Account } from 'src/dictionaries/account/model/account';
import { operationDefault, Operation } from 'src/operation/model/operation';
import { OperationType } from 'src/operation/model/operation-type';

/**
 * Операции с наличными
 */
export interface CashOperation extends Operation {
  /**
   * Идентификатор счета
   */
  accountID: string;

  /**
   * Счет
   */
  account: Account | null;

  /**
   * Тип операции дебет/кредит
   */
  operationType: OperationType;
}

export function cashOperationDefault(): CashOperation {
  return {
    ...operationDefault(),
    accountID: '',
    account: null,
    operationType: OperationType.Debited,
  };
}

export function cashOperationFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    accountID: new FormControl<string>(EMPTY_GUID),
    account: new FormControl<Account | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Credited),
  });
}
