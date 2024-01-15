import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Account } from 'src/dictionaries/account/model/account';
import { operationDefault, Operation } from 'src/operation/model/operation';
import { OperationClass } from 'src/operation/model/operation-class';
import { OperationType } from 'src/operation/model/operation-type';

/**
 * Операции с наличными
 */
export class CashOperation extends Operation {
  /**
   * Идентификатор счета
   */
  public accountID: string = '';

  /**
   * Счет
   */
  public account: Account | null = null;

  /**
   * Тип операции дебет/кредит
   */
  public operationType: OperationType = OperationType.Credited;
}

export function cashOperationDefault(): CashOperation {
  return {
    ...operationDefault(),
    accountID: '',
    account: null,
    operationType: OperationType.Debited,
    operationClass: OperationClass.CashOperation,
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
    operationClass: new FormControl<OperationClass>(
      OperationClass.CashOperation
    ),
  });
}
