import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Operation, operationDefault } from 'src/operation/model/operation';
import { OperationType } from 'src/operation/model/operation-type';
import { Account } from 'src/dictionaries/account/model/account';
import { OperationClass } from 'src/operation/model/operation-class';

/**
 * Корректировка
 */
export class CorrectionOperation extends Operation {
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

export function correctionOperationDefault(): CorrectionOperation {
  return {
    ...operationDefault(),
    accountID: '',
    account: null,
    operationType: OperationType.Debited,
    operationClass: OperationClass.CorrectionOperation,
  };
}

export function correctionOperationFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    accountID: new FormControl<string>(EMPTY_GUID),
    account: new FormControl<Account | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Debited),
    operationClass: new FormControl<OperationClass>(
      OperationClass.CorrectionOperation
    ),
  });
}
