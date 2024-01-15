import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY_GUID } from 'src/const';
import { Account } from 'src/dictionaries/account/model/account';
import { Operation, operationDefault } from 'src/operation/model/operation';
import { OperationClass } from 'src/operation/model/operation-class';

/**
 * Операция перевода между счетами
 */
export class TransferOperation extends Operation {
  /**
   * Идентификатор счета кредита
   */
  public creditAccountID: string = '';

  /**
   * Счет кредит
   */
  public creditAccount: Account | null = null;

  /**
   * Идентификатор счета дебета
   */
  public debitAccountID: string = '';

  /**
   * Счет дебета
   */
  public debitAccount: Account | null = null;
}

export function transferOperationDefault(): TransferOperation {
  return {
    ...operationDefault(),
    creditAccountID: '',
    creditAccount: null,
    debitAccountID: '',
    debitAccount: null,
    operationClass: OperationClass.TransferOperation,
  };
}

export function transferOperationFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl<string>(EMPTY_GUID),
    date: new FormControl<Date>(new Date()),
    sum: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>(''),
    index: new FormControl<number>(-1),

    creditAccountID: new FormControl<string>(EMPTY_GUID),
    creditAccount: new FormControl<Account | null>(null, [Validators.required]),
    debitAccountID: new FormControl<string>(EMPTY_GUID),
    debitAccount: new FormControl<Account | null>(null, [Validators.required]),
    operationClass: new FormControl<OperationClass>(
      OperationClass.TransferOperation
    ),
  });
}
