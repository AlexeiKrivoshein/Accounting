import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/account/model/account';
import { EMPTY_GUID } from 'src/const';
import { Movement, movementDefault } from './movement';
import { OperationType } from './operation-type';

/**
 * Корректировка
 */
export interface Correction extends Movement {
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

export function correctionDefault(): Correction {
  return {
    ...movementDefault(),
    accountID: '',
    account: null,
    operationType: OperationType.Debited,
  };
}

export function correctionFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    accountID: new FormControl<string>(EMPTY_GUID),
    account: new FormControl<Account | null>(null, [Validators.required]),
    operationType: new FormControl<OperationType>(OperationType.Debited),
  });
}
